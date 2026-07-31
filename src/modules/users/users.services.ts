import bcrypt from 'bcrypt';

import db from "../../shared/db/db.js";
import { User,SafeUser } from '../../shared/types/users.types.js';
import AppError from '../../shared/Utilities/appError.js';

export async function getUserById(id:number | unknown): Promise<SafeUser> {
    const res = await db.query<SafeUser>('SELECT ID,NAME,EMAIL,BIO,PHONE,LINKED_IN_URL,GITHUB_URL,AVATAR_URL FROM USERS WHERE ID = $1;',[id]);
    const data = res.rows;
    if(!data) throw new AppError("User not found",404);
    return data[0];
}

export async function getAllUsersData(): Promise<SafeUser[]> {
    const res = await db.query<SafeUser>('SELECT ID,NAME,EMAIL,BIO,PHONE,LINKED_IN_URL,GITHUB_URL,AVATAR_URL FROM USERS;');
    const data = res.rows;
    return data;
}

export async function getUserByEmail(email:string) {
    const res = await db.query<SafeUser>('SELECT ID,NAME,EMAIL,BIO,PHONE,LINKED_IN_URL,GITHUB_URL,AVATAR_URL FROM USERS WHERE EMAIL = $1',[email]);
    const data = res.rows;
    if(!data) throw new AppError("User not found",404);
    return data[0];
}

export async function deleteUser(id: number | unknown, password: string): Promise<Boolean> {
    const userData = await db.query<User>('SELECT ID,HASHED_PASSWORD FROM USERS WHERE ID = $1;', [id]);
    const data = userData.rows[0];

    const verify = await bcrypt.compare(password, data['hashed_password']);

    if(verify){
        await db.query('DELETE FROM USERS WHERE ID = $1;',[id]);
        return true;
    }
    return false;
}

export async function editUser(query:string,id:number|unknown,values:unknown[]):Promise<SafeUser> {
    const res = await db.query<SafeUser>(`UPDATE USERS SET ${query} WHERE ID = $${values.length+1} RETURNING ID,NAME,EMAIL,STATUS,BIO,PHONE,LINKED_IN_URL,GITHUB_URL,AVATAR_URL;`,[...values,id]);
    const data = res.rows[0];
    return data;
}