import 'dotenv/config'
import express, { json } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import mainRouter from './routes'
import cors from 'cors'
const app = express()
const port = 3000
app.use(helmet())
app.use(cors())
app.use(json())
app.use(morgan('dev'))
app.use(mainRouter)
app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`))
