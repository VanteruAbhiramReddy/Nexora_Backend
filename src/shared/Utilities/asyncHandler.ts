import { Request, Response, NextFunction } from "express";
import { AsyncHandler } from "../types/express.types.js";

const asyncHandler =
  <T = {}>(fn: AsyncHandler<T>) =>
    (
      req: Request<T>,
      res: Response,
      next: NextFunction
    ) => {
      Promise.resolve(
        fn(req, res, next)
      ).catch(next);
    };

export default asyncHandler;