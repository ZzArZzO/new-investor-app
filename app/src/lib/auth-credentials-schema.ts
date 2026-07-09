import * as z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
