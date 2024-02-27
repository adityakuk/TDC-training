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
exports.PersonResolver = void 0;
const type_graphql_1 = require("type-graphql");
require("reflect-metadata");
const type_graphql_2 = require("type-graphql");
let PersonResolver = class PersonResolver {
    getPerson() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Person.find();
        });
    }
    addPerson(Name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Person.create({ Name }).save();
            return true;
        });
    }
    UpdatePerson(id, Name) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield Person.findOne({ where: { id } });
            if (!person)
                throw new Error("Person not found");
            person.Name = Name;
            yield person.save();
            return person;
        });
    }
    deletePerson(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const DelPerson = yield Person.findOne({ where: { id } });
            if (!DelPerson)
                throw new Error("Person not found");
            yield DelPerson.remove();
            return true;
        });
    }
};
exports.PersonResolver = PersonResolver;
__decorate([
    (0, type_graphql_2.Query)(() => [Person]),
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
    (0, type_graphql_1.Mutation)(() => Person),
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
exports.PersonResolver = PersonResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PersonResolver);
