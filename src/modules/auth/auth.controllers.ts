import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../shared/Utilities/asyncHandler.js';

import { createUser, loginUser } from './auth.services.js';
import { LoginDTO, SignUpDTO } from './auth.types.js';


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

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ "success": true })
    })
})