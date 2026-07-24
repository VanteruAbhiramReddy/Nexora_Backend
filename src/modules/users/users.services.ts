import bcrypt from 'bcrypt';

import db from "../../shared/db/db.js";
import { User,SafeUser } from '../../shared/types/users.types.js';


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

export async function getCurrentUserData(id: number | unknown): Promise<SafeUser> {
    const res = await db.query<SafeUser>('SELECT ID,NAME,EMAIL,BIO,PHONE,LINKED_IN_URL,GITHUB_URL,AVATAR_URL FROM USERS WHERE ID=$1;', [id]);
    const data = res.rows[0];
    return data;
}