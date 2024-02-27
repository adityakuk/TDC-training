import { Arg, Field, ID, InputType, Mutation, ObjectType } from "type-graphql";
import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema, Resolver, Query } from "type-graphql";
import {
  BaseEntity,
  Column,
  DataSource,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field(() => String)
  title?: string;

  @Column({nullable: true})
  @Field(() => String)
  author?: string;

  @Field(() => [Person], { nullable: true })
  @OneToMany(() => Person, person => person.book)
  persons?: Person[]
}

@ObjectType()
@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  name!: string;
  

  @Column({nullable: true})
  @Field({
    nullable: true
  })
  bookId?: string

  @Field(() => Book, { nullable: true })
  @ManyToOne(() => Book, book => book.persons)
  book?: Book 
}



// Resolver for Books
class BookResolver {
  @Query(() => [Book])
  async getBooks(): Promise<Book[]> {
    return await Book.find({
      relations: {
        persons: true
      }
    });
  }
  @Mutation(() => Boolean)
  async addBook(@Arg("title") title: string, @Arg("author") author: string) : Promise<boolean> {
    await Book.create({ title, author}).save();
    return true;
  }
  @Mutation(() => Book)
  async UpdateBook(
    @Arg("id") id: string,
    @Arg("title") title: string,
    @Arg("author") author: string
  ): Promise<Book> {
    const book = await Book.findOne({ where: { id } });
    if (!book) throw new Error("Book not found");
    book.title = title;
    book.author = author;
    await book.save();
    return book;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg("id") id: string): Promise<boolean> {
    const book = await Book.findOne({ where: { id }, relations: ['persons']});
    if (!book) throw new Error("Book not found");

    if(book.persons) {
      for(const person of book.persons){
        person.bookId = null;
        await person.save();  
      }
    }
    await book.remove();
    return true;
  }
}

// Resolver for Person
class PersonResolver {
  @Query(() => [Person])
  async getPerson(): Promise<Person[]> {
    return await Person.find({
      relations: {
        book: true
      }
    });
  }

  @Mutation(() => Boolean)
  async addPerson(
    @Arg("name") name: string,
    @Arg("bookId", {nullable: true}) bookId?: string
    ): Promise<Boolean> {
    await Person.create({ name, bookId }).save();
    return true;
  }

  @Mutation(() => Person)
  async UpdatePerson(
    @Arg("id") id: string,
    @Arg("name") name: string
  ): Promise<Person> {
    const person = await Person.findOne({ where: { id } });
    if (!person) throw new Error("Person not found");
    person.name = name;
    await person.save();
    return person;
  }

  @Mutation(() => Boolean)
  async deletePerson(@Arg("id") id: string): Promise<boolean> {
    const person = await Person.findOne({ where: { id } });
    if (!person) throw new Error("Person not found");
    await person.remove();
    return true;
  }
}

const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://postgres.sjcxhjnfkobtvlcewunn:whRWXGTf3anqtFEG@aws-0-us-west-1.pooler.supabase.com:5432/postgres",
  database: "test",
  synchronize: true,
  logging: true,
  entities: [Book, Person],
  subscribers: [],
  migrations: [],
});

await AppDataSource.initialize();

async function myFun() {
  const schema = await buildSchema({
    resolvers: [BookResolver, PersonResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen({ port: 5000 });
  console.log(`🚀  Server ready at: ${url}`);
}
myFun();

// import { Arg, Field, InputType, Mutation, ObjectType } from "type-graphql";
// import { ApolloServer } from "apollo-server";
// import "reflect-metadata";
// import { buildSchema, Resolver, Query } from "type-graphql";

// const books = [
//   {
//     id: "1",
//     title: "The Awakening Adi",
//     author: "Kate Chopin",
//   },
//   {
//     id: "2",
//     title: "City of Glass",
//     author: "Paul Auster",
//   },
// ];

// @ObjectType()
// class Book {
//   @Field()
//   id: string;

//   @Field()
//   title: string;

//   @Field()
//   author: string;
// }

// @InputType()
// class BookInput {
//   @Field()
//   title: string;

//   @Field()
//   author: string;
// }

// @Resolver()
// class BookResolver {
//   @Query(() => [Book])
//   books(): Book[] {
//     return books;
//   }

//   @Mutation(() => Book)
//   addBook(@Arg("input") input: BookInput): Book {
//     const newBook = {
//       id: String(books.length + 1),
//       ...input,
//     };
//     books.push(newBook);
//     return newBook;
//   }

//   @Mutation(() => Book)
//   deleteBook(@Arg("id") id: string): Book | undefined {
//     const index = books.findIndex((book) => book.id === id);
//     if (index === -1) {
//       throw new Error("Book not found");
//     }
//     const deleteBook = books.splice(index, 1)[0];
//     return deleteBook;
//   }

//   @Mutation(() => Book)
//   updateBook(
//     @Arg("id") id: string,
//     @Arg("input") input: BookInput
//   ): Book | undefined {
//     const book = books.find((book) => book.id === id);
//     if (!book) {
//       throw new Error("Book not found");
//     }
//     book.title = input.title;
//     book.author = input.author;
//     return book;
//   }
// }

// async function myFun() {
//   const schema = await buildSchema({
//     resolvers: [BookResolver],
//   });

//   const server = new ApolloServer({ schema });

//   const { url } = await server.listen({ port: 5000 });
//   console.log(`🚀  Server ready at: ${url}`);
// }

// myFun();
