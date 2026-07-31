import z, { number } from "zod";
import { createProjectSchema,editProjectSchema,changeProjectOwnershipSchema } from "./projects.schemas.js";

export type createProjectDTO = z.infer<typeof createProjectSchema>;

export type editProjectDTO = z.infer<typeof editProjectSchema>;

export type changeProjectOwnershipDTO = z.infer<typeof changeProjectOwnershipSchema>;

export interface Project {
    id : number;
    name : string;
    description : string;
    created_by : number;
    created_at : string;
    updated_at : string;
    owned_by : string;
};

export type ProjectRes = {
    id : number,
    name : string,
    description ?: string,
    founder : string,
    owner : string,
    members : number,
    created_at : string,
    updated_at : string
}