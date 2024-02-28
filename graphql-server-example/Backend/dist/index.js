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
import { BaseEntity, Column, DataSource, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
let Book = class Book extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    Field(),
    __metadata("design:type", String)
], Book.prototype, "id", void 0);
__decorate([
    Column(),
    Field(() => String),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    Column({ nullable: true }),
    Field(() => String),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    Field(() => [Person], { nullable: true }),
    OneToMany(() => Person, (person) => person.book),
    __metadata("design:type", Array)
], Book.prototype, "persons", void 0);
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
], Person.prototype, "name", void 0);
__decorate([
    Column({ nullable: true }),
    Field({
        nullable: true,
    }),
    __metadata("design:type", String)
], Person.prototype, "bookId", void 0);
__decorate([
    Field(() => Book, { nullable: true }),
    ManyToOne(() => Book, (book) => book.persons),
    __metadata("design:type", Book)
], Person.prototype, "book", void 0);
Person = __decorate([
    ObjectType(),
    Entity()
], Person);
export { Person };
// Resolver for Books
class BookResolver {
    async getBooks() {
        return await Book.find({
            relations: {
                persons: true,
            },
        });
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
        const book = await Book.findOne({ where: { id }, relations: ["persons"] });
        if (!book)
            throw new Error("Book not found");
        if (book.persons) {
            for (const person of book.persons) {
                person.bookId = null;
                await person.save();
            }
        }
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
        return await Person.find({
            relations: {
                book: true,
            },
        });
    }
    async addPerson(name, bookId) {
        await Person.create({ name, bookId }).save();
        return true;
    }
    async UpdatePerson(id, name) {
        const person = await Person.findOne({ where: { id } });
        if (!person)
            throw new Error("Person not found");
        person.name = name;
        await person.save();
        return person;
    }
    async deletePerson(id) {
        const person = await Person.findOne({ where: { id } });
        if (!person)
            throw new Error("Person not found");
        await person.remove();
        return true;
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
    __param(0, Arg("name")),
    __param(1, Arg("bookId", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "addPerson", null);
__decorate([
    Mutation(() => Person),
    __param(0, Arg("id")),
    __param(1, Arg("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "UpdatePerson", null);
__decorate([
    Mutation(() => Boolean),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "deletePerson", null);
const AppDataSource = new DataSource({
    type: "postgres",
    url: "postgres://postgres.sjcxhjnfkobtvlcewunn:whRWXGTf3anqtFEG@aws-0-us-west-1.pooler.supabase.com:5432/postgres",
    database: "test",
    synchronize: false,
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
