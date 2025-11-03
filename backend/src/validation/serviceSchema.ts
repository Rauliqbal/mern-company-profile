import z from "zod";

export const serviceSchema = z.object({
  title: z.string().min(4, "Min 4 Characters"),
  description: z.string().min(4, "Min 4 Characters"),
})