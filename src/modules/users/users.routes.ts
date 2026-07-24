import { Router } from "express";

import { authenticate } from "../../shared/Middlewares/auth.middlewares.js";
import validator from "../../shared/Utilities/validator.js";

import { myProfileController,deleteUserController } from "./users.controllers.js";
import { logoutController } from "../auth/auth.controllers.js";
import { deleteAccountSchema } from "./users.schemas.js";


const users = Router();

users.get('/me', authenticate, myProfileController);
users.post('/delete-account',validator(deleteAccountSchema),authenticate,deleteUserController,logoutController);

export default users;