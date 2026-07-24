import z from "zod"

import { deleteAccountSchema,updateAccountSchema } from "./users.schemas.js"
import { User } from "../../shared/types/users.types.js"

export type DeleteDTO = z.infer<typeof deleteAccountSchema>

export type GetUserByEmailDTO = {
    email : string
}

export type GetUserByIdDTO = {
    id : string
}

export type PatchUserDTO = z.infer<typeof updateAccountSchema>