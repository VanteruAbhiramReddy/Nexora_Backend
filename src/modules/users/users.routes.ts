import { Router } from "express";

import { authenticate } from "../../shared/Middlewares/auth.middlewares.js";
import validator from "../../shared/Utilities/validator.js";

import { myProfileController,deleteUserController, allUsersController, getUserByEmailController, getUserByIdController,editAccountController } from "./users.controllers.js";
import { logoutController } from "../auth/auth.controllers.js";
import { deleteAccountSchema, updateAccountSchema } from "./users.schemas.js";


const users = Router();

users.use(authenticate);

users.get('/',allUsersController);  


users.get('/email/:email',getUserByEmailController);
users.get('/id/:id',getUserByIdController);

users.get('/me', myProfileController);

users.patch('/',validator(updateAccountSchema),editAccountController)

users.post('/delete-account',validator(deleteAccountSchema),deleteUserController,logoutController);

export default users;