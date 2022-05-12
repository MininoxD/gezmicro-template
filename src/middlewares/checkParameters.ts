import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
interface Props {
    type: 'params' | 'body' | 'query',
    schema: z.ZodSchema
}
export const checkParameters = ({ type, schema }: Props) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters = req[type] || ''
      schema.parse(parameters)
      return next()
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
