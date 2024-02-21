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
let Book = class Book {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], Book.prototype, "id", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
Book = __decorate([
    ObjectType()
], Book);
let BookInput = class BookInput {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], BookInput.prototype, "title", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], BookInput.prototype, "author", void 0);
BookInput = __decorate([
    InputType()
], BookInput);
let BookResolver = class BookResolver {
    books() {
        return books;
    }
    addBook(input) {
        const newBook = {
            id: String(books.length + 1),
            ...input,
        };
        books.push(newBook);
        return newBook;
    }
    deleteBook(id) {
        const index = books.findIndex((book) => book.id === id);
        if (index === -1) {
            throw new Error("Book not found");
        }
        const deleteBook = books.splice(index, 1)[0];
        return deleteBook;
    }
    updateBook(id, input) {
        const book = books.find((book) => book.id === id);
        if (!book) {
            throw new Error("Book not found");
        }
        book.title = input.title;
        book.author = input.author;
        return book;
    }
};
__decorate([
    Query(() => [Book]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], BookResolver.prototype, "books", null);
__decorate([
    Mutation(() => Book),
    __param(0, Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BookInput]),
    __metadata("design:returntype", Book)
], BookResolver.prototype, "addBook", null);
__decorate([
    Mutation(() => Book),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Book)
], BookResolver.prototype, "deleteBook", null);
__decorate([
    Mutation(() => Book),
    __param(0, Arg("id")),
    __param(1, Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, BookInput]),
    __metadata("design:returntype", Book)
], BookResolver.prototype, "updateBook", null);
BookResolver = __decorate([
    Resolver()
], BookResolver);
async function myFun() {
    const schema = await buildSchema({
        resolvers: [BookResolver],
    });
    const server = new ApolloServer({ schema });
    const { url } = await server.listen({ port: 5000 });
    console.log(`🚀  Server ready at: ${url}`);
}
myFun();
