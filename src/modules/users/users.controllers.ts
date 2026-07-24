import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../shared/Utilities/asyncHandler.js';

import { deleteUser,getCurrentUserData } from './users.services.js';
import { DeleteDTO } from './users.types.js';

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