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
  isVerified: boolean("is_verified").default(false).notNull(),
  profile: varchar({ length: 255 }),
  photoUrl: varchar("photo_url", { length: 255 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date())
    .notNull(),
});

export const refreshTokenTable = pgTable("refresh_token", {
  token: varchar("token", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
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
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  description: text().notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
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
//    createdAt: timestamp("created_at")
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
//   updatedAt: timestamp("updated_at")
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
  jobTitle: varchar("job_title",{ length: 255 }).notNull(),
  company: varchar({ length: 255 }).notNull(),
  message: text().notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
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
  thumbnailUrl: varchar("thumbnail_url",{ length: 255 }).notNull(),
  projectUrl: varchar("project_url",{ length: 255 }).notNull(),
  description: text().notNull(),
  testimonialId: varchar("testimonial_id",{ length: 255 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date())
    .notNull(),
});

export const portfolioRelations = relations(portfolioTable, ({ one }) => ({
  testimonial: one(testimonialTable, {
    fields: [portfolioTable.testimonialId],
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
  authorId: varchar("user_id",{ length: 255 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date())
    .notNull(),
});

export const usersRelation = relations(userTable, ({ many }) => ({
  blogs: many(blogTable),
}));

export const blogsRelation = relations(blogTable, ({ one }) => ({
  testimonial: one(testimonialTable, {
    fields: [blogTable.authorId],
    references: [testimonialTable.id],
  }),
}));