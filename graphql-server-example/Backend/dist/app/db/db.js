"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const BookEntity_1 = require("./entities/BookEntity");
const AuthorEntity_1 = require("./entities/AuthorEntity");
const dataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: "postgres://postgres.sjcxhjnfkobtvlcewunn:whRWXGTf3anqtFEG@aws-0-us-west-1.pooler.supabase.com:5432/postgres",
    database: "test",
    synchronize: false,
    logging: true,
    entities: [BookEntity_1.BookEntity, AuthorEntity_1.AuthorEntity],
    subscribers: [],
    migrations: [],
});
