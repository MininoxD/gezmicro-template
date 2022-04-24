import { Router } from 'express'
import infoServer from '../../package.json'
const mainRouter = Router()
mainRouter.get('/', (req, res) => {
  res.send({
    name: infoServer.name,
    version: infoServer.version,
    author: infoServer.author
  })
})
export default mainRouter
