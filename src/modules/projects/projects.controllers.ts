import { Request, Response ,NextFunction } from "express";
import asyncHandler from "../../shared/Utilities/asyncHandler.js";
import { createProject, getAllProjects } from "./projects.services.js";
import { createProjectDTO } from "./projects.types.js";


export const getAllProjectsControllers = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const user_id = req.userId;
    const projects = await getAllProjects(user_id);
    res.status(200).json({success : true, projects});
})

export const createProjectController = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const user_id = req.userId;
    const validated = req.validated as createProjectDTO;
    const project = await createProject(user_id,validated);
    res.json({success:true,project});
})