import AppError from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { Secret, verify } from 'jsonwebtoken'
import authConfig from '@config/auth'
interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('Token JWT not found!')
  }
  const [, token] = authHeader.split(' ')

  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret)
    const { sub } = decodedToken as ITokenPayload

    req.user = {
      id: sub,
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT Token')
  }
}
