// import { Arg, Field, ID, InputType, Mutation, ObjectType } from "type-graphql";
// import { ApolloServer } from "apollo-server";
// import "reflect-metadata";
// import { buildSchema, Resolver, Query } from "type-graphql";
// import {
//   BaseEntity,
//   Column,
//   DataSource,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from "typeorm";

// class BookResolver {
//   @Query(() => [Book])
//   async getBooks(): Promise<Book[]> {
//     return await Book.find();
//   }
//   @Mutation(() => Boolean)
//   async addBook(@Arg("title") title: string): Promise<boolean> {
//     await Book.create({ title }).save();
//     return true;
//   }
//   @Mutation(() => Book)
//   async UpdateBook(
//     @Arg("id") id: string,
//     @Arg("title") title: string
//   ): Promise<Book> {
//     const book = await Book.findOne({ where: { id } });
//     if (!book) throw new Error("Book not found");
//     book.title = title;
//     await book.save();
//     return book;
//   }
//   @Mutation(() => Boolean)
//   async deleteBook(@Arg("id") id: string): Promise<boolean> {
//     const book = await Book.findOne({ where: { id } });
//     if (!book) throw new Error("Book not found");
//     await book.remove();
//     return true;
//   }
// }
// // Resolver for Person
// class PersonResolver {
//   @Query(() => [User])
//   async getPerson(): Promise<User[]> {
//     return await User.find();
//   }

//   @Mutation(() => Boolean)
//   async addPerson(@Arg("Name") Name: string): Promise<Boolean> {
//     await User.create({ Name }).save();
//     return true;
//   }

//   @Mutation(() => UserEntity)
//   async UpdatePerson(
//     @Arg("id") id: string,
//     @Arg("Name") Name: string
//   ): Promise<UserEntity> {
//     const person = await UserEntity.findOne({ where: { id } });
//     if (!person) throw new Error("Person not found");
//     person.Name = Name;
//     await person.save();
//     return person;
//   }

//   @Mutation(() => Boolean)
//   async deletePerson(@Arg("id") id: string): Promise<boolean> {
//     const DelPerson = await UserEntity.findOne({ where: { id } });
//     if (!DelPerson) throw new Error("Person not found");
//     await DelPerson.remove();
//     return true;
//   }
// }

// async function main() {
//   const schema = await buildSchema({
//     resolvers: [BookResolver, PersonResolver],
//   });

//   const server = new ApolloServer({ schema });

//   const { url } = await server.listen({ port: 5000 });
//   console.log(`🚀  Server ready at: ${url}`);
// }
// main();

import { Arg, Field, InputType, Mutation, ObjectType } from "type-graphql";
import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema, Resolver, Query } from "type-graphql";

const books = [
  {
    id: "1",
    title: "The Awakening Adi",
    author: "Kate Chopin",
  },
  {
    id: "2",
    title: "City of Glass",
    author: "Paul Auster",
  },
];

@ObjectType()
class Book {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  author: string;
}

@InputType()
class BookInput {
  @Field()
  title: string;

  @Field()
  author: string;
}

@Resolver()
class BookResolver {
  @Query(() => [Book])
  books(): Book[] {
    return books;
  }

  @Mutation(() => Book)
  addBook(@Arg("input") input: BookInput): Book {
    const newBook = {
      id: String(books.length + 1),
      ...input,
    };
    books.push(newBook);
    return newBook;
  }

  @Mutation(() => Book)
  deleteBook(@Arg("id") id: string): Book | undefined {
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) {
      throw new Error("Book not found");
    }
    const deleteBook = books.splice(index, 1)[0];
    return deleteBook;
  }

  @Mutation(() => Book)
  updateBook(
    @Arg("id") id: string,
    @Arg("input") input: BookInput
  ): Book | undefined {
    const book = books.find((book) => book.id === id);
    if (!book) {
      throw new Error("Book not found");
    }
    book.title = input.title;
    book.author = input.author;
    return book;
  }
}

async function myFun() {
  const schema = await buildSchema({
    resolvers: [BookResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen({ port: 5000 });
  console.log(`🚀  Server ready at: ${url}`);
}

myFun();
