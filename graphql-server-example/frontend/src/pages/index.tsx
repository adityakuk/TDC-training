import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, Form, Modal, Input, Card, Spin, Popconfirm } from "antd";
import { Table } from "antd";
import { useAddBookMutation, useGetBooksQuery } from "@/generated/graphql";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, loading, error, refetch } = useGetBooksQuery();
  const [addBook] = useAddBookMutation();

  const [tableData, setTableData] = useState<{}[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expandedRowKey, setExpandedRowKey] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setTableData(data.getBooks.map((book, index) => ({ ...book, key: index.toString() })));
    }
  }, [data]);

  const handleAddPerson = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    try {
      const { data } = await addBook({
        variables: {
          title: values.title,
          author: values.author,
        },
      });
      if (data && data.addBook) {
        setIsModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.error("Failed to add Books:", error);
    }
  };

  const handleDelete = () => {};

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (_: any, record: any) => (
        <div className="flex">
          <div>
            <Popconfirm
              title="Are you sure you want to delete this book?"
              onConfirm={() => handleDelete()}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ marginRight: 15, color: "red" }} />
            </Popconfirm>
          </div>
          <div>
            <EditOutlined />
          </div>
        </div>
      ),
    },
  ];

  const expandedRowRender = (record: any) => {
    return (
      <p style={{ margin: 0 }}>
        {record.persons &&
          record.persons.map((person: any) => (
            <li key={person.id}>{person.name}</li>
          ))}
      </p>
    );
  };

  const handleExpandRow = (expanded: boolean, record: any) => {
    setExpandedRowKey(expanded ? record.key : null);
  };

  return (
    <>
      <Card style={{ borderColor: "black" }}>
        {loading ? (
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            style={{ borderColor: "black" }}
            columns={columns}
            dataSource={tableData}
            expandable={{
              expandedRowKeys: expandedRowKey !== null ? [expandedRowKey] : [],
              onExpand: (expanded, record) => handleExpandRow(expanded, record),
              expandedRowRender: (record) =>
                expandedRowKey === record.key ? expandedRowRender(record) : null,
            }}
          />
        )}

        <Button type="primary" onClick={handleAddPerson}>
          Add Person
        </Button>

        <Modal title="Add Person" visible={isModalVisible} onCancel={handleCancel}>
          <Form name="addBookForm" onFinish={onFinish}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="author"
              label="Author"
              rules={[{ required: true, message: "Please input the author!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  );
}
