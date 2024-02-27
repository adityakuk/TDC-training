import { DataSource } from "typeorm";
import { BookEntity } from "./entities/BookEntity";
import { AuthorEntity } from "./entities/AuthorEntity";

const dataSource = new DataSource({
  type: "postgres",
  url: "postgres://postgres.sjcxhjnfkobtvlcewunn:whRWXGTf3anqtFEG@aws-0-us-west-1.pooler.supabase.com:5432/postgres",
  database: "test",
  synchronize: false,
  logging: true,
  entities: [BookEntity, AuthorEntity],
  subscribers: [],
  migrations: [],
});
