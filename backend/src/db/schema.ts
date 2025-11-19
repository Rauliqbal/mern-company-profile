import { relations, sql } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["ADMIN", "SUPERADMIN"]);

export const userTable = pgTable("user", {
  id: varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: roleEnum().default("ADMIN").notNull(),
  is_verified: boolean().default(false).notNull(),
  profile: varchar({ length: 255 }),
  photo_url: varchar({ length: 255 }),
  created_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date())
    .notNull(),
});

export const refreshTokenTable = pgTable("refresh_token", {
  token: varchar("token", { length: 255 }).primaryKey(),
  user_id: varchar( { length: 255 })
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expires_at: timestamp().notNull(),
  created_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date())
    .notNull(),
});

export const serviceTable = pgTable("services", {
  id: varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar({ length: 36 }).notNull(),
  image_url: varchar( { length: 255 }).notNull(),
  description: text().notNull(),
  created_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date())
    .notNull(),
});

// export const companyProfileTable = pgTable("company_profile", {
//   id: varchar({ length: 255 })
//     .notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
//   name: varchar({ length: 255 }).notNull(),
//   address: text().notNull(),
//   phone: varchar({ length: 20 }).notNull(),
//   email: varchar({ length: 255 }).notNull(),
//   founded_year: varchar({ length: 4 }).notNull(),
//   vision: text().notNull(),
//   mission: text().notNull(),
//   logo_url: varchar({ length: 255 }).notNull(),
//    created_at: timestamp()
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
//   updated_at: timestamp()
//     .default(sql`CURRENT_TIMESTAMP`)
//     .$onUpdate(() => new Date())
//     .notNull(),
// })

export const testimonialTable = pgTable("testimonials", {
  id: varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar({ length: 36 }).notNull(),
  job_title: varchar({ length: 255 }).notNull(),
  company: varchar({ length: 255 }).notNull(),
  message: text().notNull(),
  created_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date())
    .notNull(),
});

export const testimonialsRelations = relations(
  testimonialTable,
  ({ many }) => ({
    portfolios: many(portfolioTable),
  })
);

export const portfolioTable = pgTable("portfolio", {
  id: varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar({ length: 36 }).notNull(),
  thumbnail_url: varchar({ length: 255 }).notNull(),
  project_url: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  testimonial_id: varchar({ length: 255 }),
  created_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date())
    .notNull(),
});

export const portfolioRelations = relations(portfolioTable, ({ one }) => ({
  testimonial: one(testimonialTable, {
    fields: [portfolioTable.testimonial_id],
    references: [testimonialTable.id],
  }),
}));

export const blogTable = pgTable("blogs", {
  id: varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  thumbnail_url: varchar({ length: 255 }).notNull(),
  author_id: varchar({ length: 255 }),
  created_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date())
    .notNull(),
});

export const usersRelation = relations(userTable, ({ many }) => ({
  blogs: many(blogTable),
}));

export const blogsRelation = relations(blogTable, ({ one }) => ({
  testimonial: one(testimonialTable, {
    fields: [blogTable.author_id],
    references: [testimonialTable.id],
  }),
}));

export const productsTable = pgTable("products", {
  id: varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  image_url: varchar({length:255}),
  icon_url: varchar({ length: 255 }).notNull(),
  created_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date())
    .notNull(),
})