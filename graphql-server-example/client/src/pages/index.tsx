import Image from "next/image";
import { Inter } from "next/font/google";
import { useQuery, gql } from "@apollo/client";
import { useBooksQuery } from "@/generated/graphql";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { loading, error, data } = useBooksQuery();

  console.log(data);
  return (
    <div className="">
      <h3 className="text-center font-bold">Books</h3>
      {data && data.books ? (
        data.books.map((book) => (
          <ul className="text-center " key={book.id}>
            <li>{book.title}</li>
            <li>{book.author}</li>
          </ul>
        ))
      ) : (
        <li>No books found</li>
      )}
    </div>
  );
}
