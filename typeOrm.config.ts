import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource } from "typeorm";

config();
const configService = new ConfigService();

export default new DataSource({
  type: "postgres",
  host: configService.getOrThrow("POSTGRES_HOST"),
  port: configService.getOrThrow("POSTGRES_PORT"),
  database: configService.getOrThrow("POSTGRES_DB"),
  username: configService.getOrThrow("POSTGRES_USER"),
  password: configService.getOrThrow("POSTGRES_PASSWORD"),
  migrations: [__dirname + "/../apps/api/src/migrations/*{.ts,.js}"],
  entities: [__dirname + "/../apps/api/src/**/*.entity.{js,ts}"],
});
