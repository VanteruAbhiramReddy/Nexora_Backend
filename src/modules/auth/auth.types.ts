import { signUpSchema,loginSchema, deleteAccountSchema } from "./auth.schemas.js";
import {z} from 'zod'

export type SignUpDTO = z.infer<typeof signUpSchema>
export type LoginDTO = z.infer<typeof loginSchema>
export type DeleteDTO = z.infer<typeof deleteAccountSchema>
export type status = 'ACTIVE'|'INACTIVE'

export interface User{
    id:number;
    name:string;
    email:string;
    password:string,
    hashed_password :string
    bio:string,
    phone:string,
    linked_in_url : string,
    github_url : string,
    avatar_url : string,
}

export type SafeData = Omit<User,"password">

export type SafeUser = Omit<User,"password"|"hashed_password">