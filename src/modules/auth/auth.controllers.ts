import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../shared/Utilities/asyncHandler.js';

import { createUser, loginUser, deleteUser, getCurrentUserData } from './auth.services.js';
import { DeleteDTO, LoginDTO, SignUpDTO } from './auth.types.js';
import { success } from 'zod';


export const signUpController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.validated as SignUpDTO;
    const user = await createUser(data);
    req.userData = user;
    req.userId = user.id;
    next()
})

export const loginController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.validated as LoginDTO;
    const user = await loginUser(data);
    req.userData = user;
    req.userId = user.id;
    next()
})

export const manageNewSession = asyncHandler(async (req, res) => {
    const id = req.userId;
    req.session.userId = id;
    const data = req.userData;
    res.json({ success: true, data });
    return;
})

export const deleteUserController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.validated as DeleteDTO
    const id = req.userId;
    const isDeleted = await deleteUser(id, password);
    if (!isDeleted) {
        res.status(401).json({ success: false, message: "Wrong Password" });
        return;
    }
    next()
})

export const myProfileController = asyncHandler(async (req: Request, res: Response) => {
    const id = req.userId;
    const data = await getCurrentUserData(id);
    res.json({ "success": true, data });
})

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ "success": true })
    })
})