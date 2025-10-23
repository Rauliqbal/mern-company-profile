import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ["ADMIN","SUPERADMIN"])

export const user = pgTable("user", {
  id: varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar({length:255}).notNull(),
  email: varchar({length:255}).notNull().unique(),
  password: varchar({length:255}).notNull(),
  role: roleEnum().default("ADMIN").notNull()
});
