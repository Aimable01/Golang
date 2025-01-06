import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().nonempty({ message: "Please enter your name" }),
  username: z
    .string()
    .nonempty({ message: "Please enter your username" })
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]{2,19}[a-zA-Z0-9]$/, {
      message:
        "Username must be 3-20 characters long, start and end with a letter or number, and can contain underscores or hyphens",
    }),
  email: z
    .string()
    .nonempty({ message: "Please enter your email" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .nonempty({ message: "Please enter your password" })
    .min(5, { message: "Password must be at least 5 characters" }),
});

export const loginSchema = z.object({
  usernameOrEmail: z
    .string()
    .nonempty({ message: "Please enter your username or email" })
    .refine((value) => value.includes("@") || /^[a-zA-Z0-9_]+$/.test(value), {
      message: "Please enter a valid username or email",
    }),
  password: z
    .string()
    .min(5, { message: "Please enter at least 5 characters" })
    .nonempty({ message: "Please enter your password" }),
});
