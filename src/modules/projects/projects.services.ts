import db from "../../shared/db/db.js";
import AppError from "../../shared/Utilities/appError.js";
import { createProjectDTO, Project, ProjectRes } from "./projects.types.js";
import { roles } from "../../shared/Utilities/roles.js";
import { DatabaseError } from "pg";

export async function getAllProjects(userId: number | unknown): Promise<Project[]> {
    const res = await db.query<Project>(`
                SELECT P.ID, P.NAME ,P.DESCRIPTION ,P.CREATED_BY ,P.CREATED_AT ,P.UPDATED_AT ,PM.ROLE_ID 
                FROM PROJECT_MEMBERS PM
                INNER JOIN PROJECTS P
                ON P.ID = PM.PROJECT_ID 
                WHERE PM.USER_ID=$1`, [userId]);
    const data = res.rows;
    return data;
}

export async function createProject(userId: number | unknown, credentials: createProjectDTO): Promise<ProjectRes> {
    const { name, description } = credentials;
    const client = await db.connect();
    try {
        await client.query('BEGIN');

        const createProject = await client.query<Project>(`
                        INSERT INTO PROJECTS(NAME,DESCRIPTION,CREATED_BY) 
                        VALUES($1,$2,$3) RETURNING *;`, [name, description, userId]
        );

        const newProject = createProject.rows[0];

        await client.query(`
                        INSERT INTO PROJECT_MEMBERS(USER_ID,PROJECT_ID,ROLE_ID) 
                        VALUES($1,$2,$3) RETURNING *;`, [newProject.created_by, newProject.id, roles.OWNER]
        );

        const res = await client.query<ProjectRes>(`
                        SELECT P.ID, P.NAME, P.DESCRIPTION, P.CREATED_AT, P.UPDATED_AT,
                        (SELECT NAME FROM USERS WHERE ID = $1) AS FOUNDER,
                        (SELECT NAME FROM USERS WHERE ID = (
                            SELECT USER_ID FROM PROJECT_MEMBERS WHERE ROLE_ID = $2 AND PROJECT_ID = P.ID
                            )
                        ) AS OWNER,
                        (SELECT COUNT(*) FROM PROJECT_MEMBERS WHERE PROJECT_ID = $3) AS MEMBERS
                        FROM PROJECTS P
                        WHERE P.ID = $3;`
            , [newProject.created_by, roles.OWNER, newProject.id]
        );
        
        await client.query('COMMIT');
        const data = res.rows[0];
        return data;

    } catch (error) {
        await client.query('ROLLBACK');
        if(error instanceof DatabaseError && error.code === '23505') throw new AppError('Project already exists!',409);
        throw new AppError('Project creation failed!', 500);
    } finally {
        client.release();
    }
}