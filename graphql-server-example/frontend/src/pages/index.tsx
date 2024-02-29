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
  message,
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
  const [addBook, { loading: isAddBookLoading }] = useAddBookMutation();
  const [updateBook, { loading: isUpdateBookLoading }] =
    useUpdateBookMutation();
  const [addPersonMutation, { loading: isAddPersonLoading }] =
    useAddPersonMutation();
  const [updatePersonMutation, { loading: isUpdatePersonLoading }] =
    useUpdatePersonMutation();
  const [deletePersonMutation] = useDeletePersonMutation();

  const [tableData, setTableData] = useState<{}[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expandedRowKey, setExpandedRowKey] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isPersonModalVisible, setIsPersonModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [person, setPerson] = useState<{ id: string; name: string } | null>(
    null
  );
  const [existingBookTitles, setExistingBookTitles] = useState<string[]>([]);

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
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    const newTitle = values.title.trim();
    const newAuthor = values.author.trim();

    if (newTitle !== "" && newAuthor !== "") {
      if (existingBookTitles.includes(newTitle)) {
        message.error("Book title already exists");
      } else {
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
              message.success("Book updated successfully");
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
              message.success("Book added successfully");
              setExistingBookTitles([...existingBookTitles, newTitle]);
            }
          }
        } catch (error) {
          message.error("Failed to add Books");
        } finally {
          form.resetFields();
        }
      }
    } else {
      console.log("Both title and author fields are required.");
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
      message.success("Book deleted successfully");
    } catch (error) {
      message.error("Failed to delete Books:");
      console.error("Failed to delete Books:", error);
    }
  };

  const handleDeletePerson = async (personId: string) => {
    try {
      await deletePersonMutation({
        variables: {
          deletePersonId: personId,
        },
      });
      refetch();
      message.success("Person deleted successfully");
    } catch (error) {
      message.error("Failed to delete Person:");
      console.error("Failed to delete Person:", error);
    }
  };

  const handleUpdatePerson = async (person: any) => {
    setIsEditMode(true);
    setIsPersonModalVisible(true);
    setPerson(person);

    form2.setFieldValue("name", person.name);
  };

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
    form2.resetFields();
  };

  const expandedRowRender = (record: any) => {
    return (
      <div className="bg-slate-200">
        <p style={{ margin: 0 }}>
          {record.persons && record.persons.length > 0 ? (
            record.persons.map((person: any) => (
              <div key={person.id}>
                <li className="mx-10 ">{person.name}</li>
                <div className="mx-10">
                  <Tooltip title="Edit Person">
                    <EditOutlined
                      onClick={() => handleUpdatePerson(person)}
                      style={{ marginRight: "10px" }}
                    />
                  </Tooltip>
                  <Popconfirm
                    title="Are you sure you want to delete this person?"
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tooltip title="Delete Person">
                      <DeleteOutlined
                        onClick={() => handleDeletePerson(person.id)}
                        style={{ color: "red" }}
                      />
                    </Tooltip>
                  </Popconfirm>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-slate-200">
              <span>No persons available</span>
            </div>
          )}
        </p>
      </div>
    );
  };

  const handleExpandRow = (expanded: boolean, record: any) => {
    setExpandedRowKey(expanded ? record.key : null);
  };

  return (
    <>
      <div>
        <Card
          className="bg-gray-200"
          hoverable
          style={{
            marginLeft: "100px",
            marginRight: "100px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <div className="w-full">
            <Spin size="large" spinning={loading}>
              <div style={{ overflow: "auto", maxWidth: "100%" }}>
                <Table
                  style={{ borderColor: "black", minWidth: 600 }}
                  columns={[
                    {
                      title: "Title",
                      dataIndex: "title",
                      key: "title",
                      sorter: (a, b) => a.title.localeCompare(b.title),
                    },
                    {
                      title: "Author",
                      dataIndex: "author",
                      key: "author",
                      sorter: (a, b) => a.title.localeCompare(b.title),
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
                              <DeleteOutlined
                                style={{ marginRight: 15, color: "red" }}
                              />
                            </Popconfirm>
                          </div>
                          <div>
                            <Tooltip title="Update Book">
                              <EditOutlined
                                onClick={() => handleUpdate(record)}
                              />
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
                      // @ts-ignore qy
                      expandedRowKey === record.key
                        ? expandedRowRender(record)
                        : null,
                  }}
                />
              </div>
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
            confirmLoading={
              selectedBook ? isUpdateBookLoading : isAddBookLoading
            }
          >
            <Form
              name="addBookForm"
              onFinish={onFinish}
              form={form}
              validateTrigger="onBlur"
            >
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  { required: true, message: "Please input the title!" },
                  { required: true, pattern: new RegExp(/^[a-zA-Z0-9 ]*$/) },
                  {
                    required: true,
                    message: "Input needs to be less than 25 characters",
                    max: 25,
                  },
                  {
                    required: true,
                    message: "Cannot add empty whitespace",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="author"
                label="Author"
                rules={[
                  { required: true, message: "Please input the author!" },
                  { required: true, pattern: new RegExp(/^[a-zA-Z0-9 ]*$/) },
                  {
                    required: true,
                    message: "Input needs to be less than 25 characters",
                    max: 25,
                  },
                  {
                    required: true,
                    message: "Cannot add empty whitespace",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title={isEditMode ? "Update Person" : "Add Person"}
            visible={isPersonModalVisible}
            onCancel={handleCancelAddPerson}
            okText={isEditMode ? "Update Person" : "Add Person"}
            onOk={form2.submit}
            confirmLoading={
              isEditMode ? isUpdatePersonLoading : isAddPersonLoading
            }
            afterClose={() => setIsEditMode(false)}
          >
            <Form
              onFinish={async (values) => {
                try {
                  const newName = values.name.trim();

                  if (newName !== "") {
                    if (isEditMode && person) {
                      await updatePersonMutation({
                        variables: {
                          name: newName,
                          updatePersonId: person.id,
                        },
                      });
                      setIsEditMode(false);
                      setIsPersonModalVisible(false);
                      await refetch();
                      message.success("Person Update successfully");
                    } else {
                      const { data } = await addPersonMutation({
                        variables: {
                          name: newName,
                          bookId: selectedBook.id,
                        },
                      });
                      if (data && data.addPerson) {
                        message.success("Person added successfully");
                        await refetch();
                        setIsPersonModalVisible(false);
                      }
                    }
                  }
                } catch (error) {
                  console.error("Failed to add/update Person:", error);
                } finally {
                  form2.resetFields();
                }
              }}
              name="addPersonForm"
              form={form2}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Please input the name!" },
                  { required: true, pattern: new RegExp(/^[a-zA-Z0-9 ]*$/) },
                  {
                    required: true,
                    message: "Input needs to be less than 25 characters",
                    max: 25,
                  },
                  {
                    required: true,
                    message: "Cannot add empty whitespace",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </div>
    </>
  );
}
