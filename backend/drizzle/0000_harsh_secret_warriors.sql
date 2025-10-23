CREATE TYPE "public"."role" AS ENUM('ADMIN', 'SUPERADMIN');--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'ADMIN' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
