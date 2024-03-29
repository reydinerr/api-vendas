/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '@shared/errors/AppError'
import { Response, Request, NextFunction } from 'express'

const errorMiddleware = (
  error: Error & Partial<AppError>,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.error(error)

  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'Internal Server Error'
  return response.status(statusCode).json({ message })
}

export default errorMiddleware
