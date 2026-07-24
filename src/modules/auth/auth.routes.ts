import { Router } from "express";

import authMiddleware from "../../shared/Middlewares/auth.middleware.js";
import validator from "../../shared/Utilities/validator.js";

import { signUpController,loginController,manageNewSession,logoutController,deleteUserController, myProfileController } from "./auth.controllers.js";
import { signUpSchema,loginSchema, deleteAccountSchema } from "./auth.schemas.js";


const auth = Router();

auth.post('/signup',validator(signUpSchema),signUpController,manageNewSession);
auth.post('/login',validator(loginSchema),loginController,manageNewSession);

auth.delete('/logout',authMiddleware,logoutController);
auth.post('/delete-account',validator(deleteAccountSchema),authMiddleware,deleteUserController,logoutController);

auth.get('/me',authMiddleware,myProfileController);

export default auth;