import { email, z } from "zod";

export const signUpSchema = z.object({
    name : z.string().min(3).max(50),
    email : z.email(),
    password : z.string().min(8).max(18),
    bio : z.string().max(180),
    phone:z.string().regex(/^\+[1-9]\d{1,14}$/).default(""),
    linked_in_url : z.url().optional(),
    github_url : z.url().optional(),
    avatar_url : z.url()
})

export const loginSchema = z.object({
    email : z.email(),
    password : z.string()
})

