import asyncHandler from "../Utilities/asyncHandler.js";
import { Request, Response, NextFunction } from "express";

const authMiddleware = asyncHandler(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const userId = req.session.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            });

            return;
        }

        req.userId = userId;

        next();
    }
);

export default authMiddleware;