import { z } from "zod";
import { Request, Response, NextFunction } from "express";


const validator = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validated = schema.parse(req.body);
    req.validated = validated;
    next()
}

export default validator;