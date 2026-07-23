import { NextFunction, Request, Response } from "express";

export type AsyncHandler<T = {}> = (
  req: Request<T>,
  res: Response,
  next:NextFunction
) => Promise<void>;