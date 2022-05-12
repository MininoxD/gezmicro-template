import { Router } from 'express'
import infoServer from '../../package.json'
import { z } from 'zod'
import { checkParameters } from '../middlewares/checkParameters'

const testParams = z.object({
  name: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un string'
  }),
  age: z.number({
    required_error: 'La edad es requerida',
    invalid_type_error: 'La edad debe ser un número'
  }).max(100, {
    message: 'La edad no debe ser mayor a 100'
  }).min(18)
})

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
    type: 'body',
    schema: testParams
  }),
  (req, res) => {
    res.send({
      message: 'test',
      status: 'success'
    })
  }
)

export default mainRouter
