import z from "zod"
import { deleteAccountSchema } from "./users.schemas.js"

export type DeleteDTO = z.infer<typeof deleteAccountSchema>