import { NextFunction, Request, Response } from 'express'
interface Props {
  parameters: string[]
}
export const CheckParams = ({ parameters }: Props) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bodyObj = req.body || {}
    for (let index = 0; index < parameters.length; index++) {
      if (!bodyObj[parameters[index]]) {
        return res.status(400).json({ message: 'missing parameters' })
      }
    }
    return next()
  }
}
