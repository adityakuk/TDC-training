import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Button,
  Form,
  Modal,
  Input,
  Card,
  Spin,
  Popconfirm,
  Tooltip,
} from "antd";
import { Table } from "antd";
import {
  Book,
  useAddBookMutation,
  useAddPersonMutation,
  useDeleteBookMutation,
  useDeletePersonMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
  useUpdatePersonMutation,
} from "@/generated/graphql";
import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { ColumnGroupType, ColumnType, ColumnsType } from "antd/es/table";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const { data, loading, error, refetch } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [addBook, {loading: isAddBookLoading}] = useAddBookMutation();
  const [updateBook, {loading: isUpdateBookLoading}] = useUpdateBookMutation();
  const [addPersonMutation, {loading: isAddPersonLoading }] = useAddPersonMutation();
  const [updatePersonMutation, {loading: isUpdatePersonLoading}] = useUpdatePersonMutation()
  const [deletePersonMutation] = useDeletePersonMutation();

  const [tableData, setTableData] = useState<{}[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expandedRowKey, setExpandedRowKey] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isPersonModalVisible, setIsPersonModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [person, setPerson] = useState<{id: string, name:string} | null >(null)

  useEffect(() => {
    if (data) {
      setTableData(
        data.getBooks.map((book, index) => ({ ...book, key: index.toString() }))
      );
    }
  }, [data]);

  const handleAddPerson = () => {
    form.resetFields();
    setSelectedBook(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedBook(null);
    form.resetFields()
  };

  const onFinish = async (values: any) => {
    try {
      if (selectedBook) {
        const { data } = await updateBook({
          variables: {
            title: values.title,
            author: values.author,
            updateBookId: selectedBook.id,
          },
        });
        if (data && data.UpdateBook) {
          console.log("Book updated successfully");
          refetch();
          setIsModalVisible(false);
          setSelectedBook(null);
        }
      } else {
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
      }
    } catch (error) {
      console.error("Failed to add Books:", error);
    } finally {
      form.resetFields();
    }
  };

  const handleDelete = async (record: any) => {
    try {
      const bookId = record.id;

      await deleteBook({
        variables: {
          deleteBookId: bookId,
        },
      });
      refetch();
    } catch (error) {
      console.error("Failed to delete Books:", error);
    }
  };

  
  const handleDeletePerson = async(personId: string) => {
    try {
      await deletePersonMutation({
        variables: {
          deletePersonId: personId,
        },
      });
      refetch();
    } catch (error) {
      console.error("Failed to delete Person:", error);
    }
  }

  const handleUpdatePerson = async (person: any) => {
    setIsEditMode(true)
    setIsPersonModalVisible(true)
    setPerson(person)
    
    form2.setFieldValue("name", person.name)
  }

  const handleUpdate = (record: any) => {
    setSelectedBook(record);
    form.setFields([
      { name: "title", value: record?.title },
      { name: "author", value: record?.author },
    ]);

    setIsModalVisible(true);
  };

  const handleCancelAddPerson = () => {
    setIsPersonModalVisible(false);
    form2.resetFields()
  };

  const expandedRowRender = (record: any) => {
    return (
      <div>
        <p style={{ margin: 0 }}>
          {record.persons &&
            record.persons.map((person: any) => (
              <div key={person.id}>
                <li>{person.name}</li>
                <div>
                <Tooltip title="Edit Person">
                <EditOutlined
                onClick={() => handleUpdatePerson(person)}
                  style={{ marginRight: '10px' }}
                  
                />
              </Tooltip>
                <Popconfirm
                title="Are you sure you want to delete this person?"
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Delete Person">
                  <DeleteOutlined onClick={() => handleDeletePerson(person.id)} style={{ color: 'red' }} />
                </Tooltip>
              </Popconfirm>
                </div>
              </div>
            ))}
        </p>
      </div>
    );
  };

  const handleExpandRow = (expanded: boolean, record: any) => {
    setExpandedRowKey(expanded ? record.key : null);
  };

  return (
    <>
      <Card style={{ borderColor: "black" }}>
        <div className="w-full">
          <Spin size="large" spinning={loading}>
            <Table
              style={{ borderColor: "black" }}
              columns={[
                {
                  title: "Title",
                  dataIndex: "title",
                  key: "title",
                  sorter: (a, b) => a.title.localeCompare(b.title)
                },
                {
                  title: "Author",
                  dataIndex: "author",
                  key: "author",
                  sorter: (a, b) => a.title.localeCompare(b.title)
                },
                {
                  title: "Add Person",
                  dataIndex: "person",
                  key: "person",
                  render: (_: any, record: any) => (
                    <Button
                      type="primary"
                      ghost
                      onClick={() => {
                        setSelectedBook(record);
                        setIsPersonModalVisible(true);
                      }}
                    >
                      Add Person
                    </Button>
                  ),
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
                          onConfirm={() => handleDelete(record)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined style={{ marginRight: 15, color: "red" }} />
                        </Popconfirm>
                      </div>
                      <div>
                        <Tooltip title="Update Book">
                          <EditOutlined onClick={() => handleUpdate(record)} />
                        </Tooltip>
                      </div>
                    </div>
                  ),
                },
              ]}
              dataSource={tableData}
              expandable={{
                expandedRowKeys:
                  expandedRowKey !== null ? [expandedRowKey] : [],
                onExpand: (expanded, record) =>
                  handleExpandRow(expanded, record),
                expandedRowRender: (record) =>
                  // @ts-ignore
                  expandedRowKey === record.key
                    ? expandedRowRender(record)
                    : null,
              }}
            />
          </Spin>
        </div>

        <Button type="primary" onClick={handleAddPerson}>
          Add Book
        </Button>

        <Modal
          title={selectedBook ? "Update Book" : "Add Book"}
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={form.submit}
          confirmLoading={selectedBook ? isUpdateBookLoading: isAddBookLoading}
          
        >
          <Form name="addBookForm" onFinish={onFinish} form={form} validateTrigger="onBlur">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please input the title!" }, {required: true, message: "Input needs to be less than 50 characters", max: 50}]}
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
          </Form>
        </Modal>

        <Modal
          title="Add Person"
          visible={isPersonModalVisible}
          onCancel={handleCancelAddPerson}
          okText={isEditMode ? "Edit Person" : "Add Person"}
          onOk={form2.submit}
          confirmLoading={isEditMode ? isUpdatePersonLoading : isAddPersonLoading}
        >
          <Form
            onFinish={async (values) => {
              try {
                if (isEditMode && person) {
                  await updatePersonMutation({variables: {name: values.name, updatePersonId: person.id}})
                  setIsEditMode(false)
                  setIsPersonModalVisible(false)
                  await refetch();
                  return
                }

                const { data } = await addPersonMutation({
                  variables: {
                    name: values.name,
                    bookId: selectedBook.id,
                  },
                });
                if (data && data.addPerson) {
                  console.log("Person added successfully");
                  await refetch();
                  setIsPersonModalVisible(false);
                }
              } catch (error) {
                console.error("Failed to add Person:", error);
              }
            }}
            name="addPersonForm"
            form={form2}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  );
}
