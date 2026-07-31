import z from "zod";

export const createProjectSchema = z.object({
    name : z.string().min(5).max(18),
    description : z.string().max(180),
});

// created_by = id from session cookie or auth middleware

export const editProjectSchema = z.object({
    id : z.number(),
    name : z.string().min(5).max(18).optional(),
    description : z.string().max(180).optional()
});

export const changeProjectOwnershipSchema = z.object({
    id : z.number(),
    old_owner_id : z.number(),
    new_owner_id : z.number()
});