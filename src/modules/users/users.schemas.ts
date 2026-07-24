import z from "zod"

export const deleteAccountSchema = z.object({
    password: z.string()
});

export const updateAccountSchema = z.object({
    name: z.string(),
    email: z.email(),
    bio: z.string().max(180),
    phone: z.string().max(15),
    linked_in_url: z.url().optional(),
    github_url: z.url().optional(),
    avatar_url: z.url().optional()
});