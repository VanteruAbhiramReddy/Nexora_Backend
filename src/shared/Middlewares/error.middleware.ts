import { ZodError } from 'zod'
import { Request,Response,NextFunction, ErrorRequestHandler } from 'express'
import AppError from '../Utilities/appError.js'

const errorMiddleware = (err:unknown, req:Request, res:Response, next:NextFunction) => {

  console.error(err)

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map(error => ({
        field: error.path.join("."),
        message: error.message
      }))
    })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: err.success,
      status: err.status,

      message: err.message
    })
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  })
}

export default errorMiddleware;