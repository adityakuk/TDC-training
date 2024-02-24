var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Arg, Field, Mutation, ObjectType } from "type-graphql";
import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema, Query } from "type-graphql";
import { BaseEntity, Column, DataSource, Entity, PrimaryGeneratedColumn, } from "typeorm";
let Book = class Book extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    Field(),
    __metadata("design:type", String)
], Book.prototype, "id", void 0);
__decorate([
    Column(),
    Field(),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    Column(),
    Field(),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
Book = __decorate([
    ObjectType(),
    Entity()
], Book);
export { Book };
let Person = class Person extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    Field(),
    __metadata("design:type", String)
], Person.prototype, "id", void 0);
__decorate([
    Column(),
    Field(),
    __metadata("design:type", String)
], Person.prototype, "Name", void 0);
__decorate([
    Column({ nullable: true }),
    Field({ nullable: true }),
    __metadata("design:type", String)
], Person.prototype, "BookId", void 0);
Person = __decorate([
    ObjectType(),
    Entity()
], Person);
export { Person };
// Resolver for Books
class BookResolver {
    async getBooks() {
        return await Book.find();
    }
    async addBook(title, author) {
        await Book.create({ title, author }).save();
        return true;
    }
    async UpdateBook(id, title, author) {
        const book = await Book.findOne({ where: { id } });
        if (!book)
            throw new Error("Book not found");
        book.title = title;
        book.author = author;
        await book.save();
        return book;
    }
    async deleteBook(id) {
        const book = await Book.findOne({ where: { id } });
        if (!book)
            throw new Error("Book not found");
        await book.remove();
        return true;
    }
}
__decorate([
    Query(() => [Book]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "getBooks", null);
__decorate([
    Mutation(() => Boolean),
    __param(0, Arg("title")),
    __param(1, Arg("author")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "addBook", null);
__decorate([
    Mutation(() => Book),
    __param(0, Arg("id")),
    __param(1, Arg("title")),
    __param(2, Arg("author")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "UpdateBook", null);
__decorate([
    Mutation(() => Boolean),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "deleteBook", null);
// Resolver for Person
class PersonResolver {
    async getPerson() {
        return await Person.find();
    }
    async addPerson(Name) {
        await Person.create({ Name }).save();
        return true;
    }
    async UpdateBook(id, Name) {
        const person = await Person.findOne({ where: { id } });
        if (!person)
            throw new Error("Book not found");
        person.Name = Name;
        await person.save();
        return person;
    }
}
__decorate([
    Query(() => [Person]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "getPerson", null);
__decorate([
    Mutation(() => Boolean),
    __param(0, Arg("Name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "addPerson", null);
__decorate([
    Mutation(() => Person),
    __param(0, Arg("id")),
    __param(1, Arg("Name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "UpdateBook", null);
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
