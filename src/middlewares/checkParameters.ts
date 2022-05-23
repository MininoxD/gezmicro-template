import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
interface Props {
    type: 'params' | 'body' | 'query',
    schema: z.ZodSchema
}
export const checkParameters = ({ type, schema }: Props) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parameters = req[type] || ''
    const validation = schema.safeParse(parameters)
    if (!validation.success) {
      return res.status(400).json({ errors: (validation as any).error?.issues })
    }
    return next()
  }
}
