import { Router } from "express";

import { authenticate } from "../../shared/Middlewares/auth.middlewares.js";
import { getAllProjectsControllers, createProjectController } from "./projects.controllers.js";
import validator from "../../shared/Utilities/validator.js";
import { createProjectSchema } from "./projects.schemas.js";

const projects = Router();

projects.use(authenticate);

projects.get('/',getAllProjectsControllers);
projects.post('/',validator(createProjectSchema),createProjectController)

export default projects;