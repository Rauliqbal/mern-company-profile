import db from ".";
import * as schema from "./schema";
import argon2 from "argon2";
import { randomUUID } from "crypto";

async function main() {
  console.log("🌱 Seeding...");

  // Hapus semua data
  await db.delete(schema.refreshTokenTable);
  await db.delete(schema.userTable);

  const password = await argon2.hash("admin");

  const [user] = await db
    .insert(schema.userTable)
    .values({
      name: "Super Admin",
      email: "admin@example.com",
      password,
      role: "SUPERADMIN",
      isVerified: true,
      profile: null,
      photoUrl: null,
    })
    .returning();

  await db.insert(schema.refreshTokenTable).values({
    token: randomUUID(),
    userId: user.id,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  console.log("✅ Seeding selesai!");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
