import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../shared/Utilities/asyncHandler.js';
import concat from '../../shared/Utilities/concatenator.js';

import { deleteUser, getAllUsersData, getUserByEmail, getUserById, editUser } from './users.services.js';
import { DeleteDTO, GetUserByEmailDTO, GetUserByIdDTO, PatchUserDTO } from './users.types.js';

export const allUsersController = asyncHandler(async (req: Request, res: Response) => {
    const users = await getAllUsersData();
    res.status(200).json({ success: true, users });
})

export const getUserByEmailController = asyncHandler(async (req: Request<GetUserByEmailDTO>, res: Response) => {
    const email = req.params.email;
    const user = await getUserByEmail(email);
    res.status(200).json({ success: true, user });
})

export const getUserByIdController = asyncHandler(async (req: Request<GetUserByIdDTO>, res: Response) => {
    const id = Number(req.params.id);
    const user = await getUserById(id);
    res.status(200).json({ success: true, user });
})

export const myProfileController = asyncHandler(async (req: Request, res: Response) => {
    const id = req.userId;
    const data = await getUserById(id);
    res.json({ "success": true, data });
})

export const editAccountController = asyncHandler(async (req: Request,res: Response)=>{
    const id = req.userId;
    const validated = req.validated as PatchUserDTO;
    const params = concat(Object.keys(validated));
    const values = Object.values(validated);
    const update = await editUser(params,id,values);
    res.status(200).json(update);
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