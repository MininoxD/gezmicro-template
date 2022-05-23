import { Router } from 'express'
import infoServer from '../../package.json'
import { z } from 'zod'
import { checkParameters } from '../middlewares/checkParameters'

export const ParamsCreditScore = z.object({
  documentNumber: z.preprocess((value) => {
    if (value) return Number(value)
    return undefined
  }, z.number({
    required_error: 'El número de documento es requerido',
    invalid_type_error: 'El número de documento debe ser un número'
  })),
  documentType: z.enum(['DNI', 'PASAPORTE', 'CUIT']),
  gender: z.preprocess((value) => value || undefined, z.enum(['F', 'M']).optional())
}).refine(
  (data) => {
    if (data?.documentType === 'CUIT' && data?.documentNumber) return true
    if (data?.documentType && data?.documentType && data?.gender) return true
    return false
  },
  (data) => ({ message: `El genero es requerido cuando el documento es ${data?.documentType}` })
)

const mainRouter = Router()
mainRouter.get('/', (req, res) => {
  res.send({
    name: infoServer.name,
    version: infoServer.version,
    author: infoServer.author
  })
})

mainRouter.get('/test',
  checkParameters({
    type: 'query',
    schema: ParamsCreditScore
  }),
  (req, res) => {
    res.send({
      message: 'test',
      status: 'success'
    })
  }
)

export default mainRouter
