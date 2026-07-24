import {z} from 'zod'
import { signUpSchema,loginSchema } from "./auth.schemas.js";

export type SignUpDTO = z.infer<typeof signUpSchema>
export type LoginDTO = z.infer<typeof loginSchema>
export type status = 'ACTIVE'|'INACTIVE'