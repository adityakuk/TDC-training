import Image from "next/image";
import { Inter } from "next/font/google";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  useAddBookMutation,
  useBooksLazyQuery,
  useBooksQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "@/generated/graphql";
import { ChangeEvent, useState } from "react";
import { FormEvent } from "react";
import { Button, DatePicker, Space } from "antd";

const inter = Inter({ subsets: ["latin"] });

interface Book {
  id: string;
  title: string;
  author: string;
}

export default function Home() {
  const [getBooks, { loading, error, data, refetch }] = useBooksLazyQuery();
  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  const fetchBooks = () => {
    getBooks();
  };

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const handleUpdateClick = (
    bookId: string,
    bookTitle: string,
    bookAuthor: string
  ) => {
    setSelectedBook({ id: bookId, title: bookTitle, author: bookAuthor });

    setTitle(bookTitle);
    setAuthor(bookAuthor);
  };

  const handleCancelUpdate = () => {
    setSelectedBook(null);
  };

  const handleUpdate = async () => {
    try {
      if (selectedBook) {
        await updateBook({
          variables: {
            updateBookId: selectedBook.id,
            input: {
              title: title || selectedBook.title,
              author: author || selectedBook.author,
            },
          },
        });
        getBooks();
        setSelectedBook(null);
        setTitle("");
        setAuthor("");
      } else {
        console.error("No book selected for update");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await addBook({
        variables: {
          input: {
            title: title,
            author: author,
          },
        },
      });
      getBooks();
    } catch (error) {
      console.error("Error adding book", error);
    }

    setTitle("");
    setAuthor("");
    refetch();
  };

  const handleDelete = async (bookId: string) => {
    try {
      await deleteBook({
        variables: {
          deleteBookId: bookId,
        },
      });
      refetch();
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  return (
    <div className="">
      <h3 className="text-center font-bold">Books</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : data && data.books ? (
        <div className="text-center">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Author</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.books.map((book) => (
                <tr key={book.id}>
                  <td className="border px-4 py-2">{book.title}</td>
                  <td className="border px-4 py-2">{book.author}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={() =>
                        handleUpdateClick(book.id, book.title, book.author)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <button
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={fetchBooks}
        >
          Open Books
        </button>
      )}

      <form onSubmit={selectedBook ? handleUpdate : handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={handleAuthorChange}
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit"
        >
          {selectedBook ? "Update Book" : "Add Book"}
        </button>
        {selectedBook && (
          <button
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleCancelUpdate}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
