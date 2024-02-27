"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const apollo_server_1 = require("apollo-server");
require("reflect-metadata");
const type_graphql_2 = require("type-graphql");
class BookResolver {
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Book.find();
        });
    }
    addBook(title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Book.create({ title }).save();
            return true;
        });
    }
    UpdateBook(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield Book.findOne({ where: { id } });
            if (!book)
                throw new Error("Book not found");
            book.title = title;
            yield book.save();
            return book;
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield Book.findOne({ where: { id } });
            if (!book)
                throw new Error("Book not found");
            yield book.remove();
            return true;
        });
    }
}
__decorate([
    (0, type_graphql_2.Query)(() => [Book]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "getBooks", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "addBook", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Book),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "UpdateBook", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "deleteBook", null);
// Resolver for Person
class PersonResolver {
    getPerson() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.find();
        });
    }
    addPerson(Name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User.create({ Name }).save();
            return true;
        });
    }
    UpdatePerson(id, Name) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield User.findOne({ where: { id } });
            if (!person)
                throw new Error("Person not found");
            person.Name = Name;
            yield person.save();
            return person;
        });
    }
    deletePerson(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const DelPerson = yield User.findOne({ where: { id } });
            if (!DelPerson)
                throw new Error("Person not found");
            yield DelPerson.remove();
            return true;
        });
    }
}
__decorate([
    (0, type_graphql_2.Query)(() => [User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "getPerson", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("Name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "addPerson", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("Name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "UpdatePerson", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "deletePerson", null);
function myFun() {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield (0, type_graphql_2.buildSchema)({
            resolvers: [BookResolver, PersonResolver],
        });
        const server = new apollo_server_1.ApolloServer({ schema });
        const { url } = yield server.listen({ port: 5000 });
        console.log(`🚀  Server ready at: ${url}`);
    });
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
