import z from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(4, "Min 4 Characters"),
    email: z.email("Email invalid"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain a special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Password not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Email invalid"),
  password: z.string("Password must be at least 8 characters long"),
});
