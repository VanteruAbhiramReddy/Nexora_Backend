import { Router } from "express";

import { authenticate } from "../../shared/Middlewares/auth.middlewares.js";
import validator from "../../shared/Utilities/validator.js";

import { signUpController,loginController,manageNewSession,logoutController } from "./auth.controllers.js";
import { signUpSchema,loginSchema } from "./auth.schemas.js";


const auth = Router();

auth.post('/signup',validator(signUpSchema),signUpController,manageNewSession);
auth.post('/login',validator(loginSchema),loginController,manageNewSession);

auth.delete('/logout',authenticate,logoutController);

export default auth;