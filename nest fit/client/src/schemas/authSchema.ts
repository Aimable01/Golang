import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().nonempty({ message: "Please enter your username" }),
  email: z
    .string()
    .nonempty({ message: "Please enter your email" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(5, { message: "Please enter at least 5 characters" })
    .nonempty({ message: "Please enter your password" }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Please enter your email" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(5, { message: "Please enter at least 5 characters" })
    .nonempty({ message: "Please enter your password" }),
});
