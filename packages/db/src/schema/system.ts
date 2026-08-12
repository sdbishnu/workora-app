import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"; 

export const systemHealth = pgTable("system_health", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  status: varchar({ length: 32 }).notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull()
});
