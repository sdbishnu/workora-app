import { defineConfig } from "drizzle-kit"; 

export default defineConfig({
  schema: "./src/schema/*.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT || 5433),
    database: process.env.DATABASE_NAME || "workora",
    user: process.env.DATABASE_USER || "workora",
    password: process.env.DATABASE_PASSWORD || "workora_dev"
  }
});
