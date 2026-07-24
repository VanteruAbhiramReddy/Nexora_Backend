import AppError from "../../shared/Utilities/appError.js";
import db from "../../shared/db/db.js";
import { DatabaseError } from "pg";
import bcrypt from 'bcrypt';

import { SignUpDTO, LoginDTO } from "./auth.types.js"
import { SafeData,SafeUser } from "../../shared/types/users.types.js";

export async function createUser(validated: SignUpDTO): Promise<SafeUser> {
    const { name, email, password, bio, phone, linked_in_url, github_url, avatar_url } = validated;
    try {
        const hashed = await bcrypt.hash(password, 12);
        const res = await db.query<SafeData>('INSERT INTO USERS(NAME,EMAIL,HASHED_PASSWORD,BIO,PHONE,LINKED_IN_URL,GITHUB_URL,AVATAR_URL) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;', [name, email, hashed,bio, phone, linked_in_url, github_url, avatar_url]);

        const data = res.rows[0];
        const {hashed_password,...safeUser} = data;

        return safeUser;
    } catch (error) {
        if (error instanceof Error) {
            if (error instanceof DatabaseError && error.code === '23505') {
                throw new AppError('Email already registered', 409)
            }
            throw error;
        }
        throw error;
    }
}

export async function loginUser(validated: LoginDTO):  Promise<SafeUser>{
    const {email,password} = validated;
    const res = await db.query<SafeData>('SELECT ID,NAME,EMAIL,HASHED_PASSWORD,PHONE,LINKED_IN_URL,GITHUB_URL,AVATAR_URL from USERS WHERE email = $1;', [email]);

    const data = res.rows[0];

    if (!data) throw new AppError("Email not registered!", 404);
    const verify = await bcrypt.compare(password, data.hashed_password);

    if (!verify) throw new AppError("Invalid Credentials!", 401);
    const {hashed_password,...safeUser} = data;
    return safeUser;
}
