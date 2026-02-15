import type { Request, Response, NextFunction } from 'express'

export type HttpError = Error & { status?: number }

export function errorHandler(
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status ?? 500
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
}
