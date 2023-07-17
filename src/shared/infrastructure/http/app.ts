import express, { Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { errors } from 'celebrate'
import routes from './routes'
import '@shared/container'
import errorMiddleware from './middlewares/error'
//import uploadConfig from '@config/upload'
//import rateLimiter from '@shared/infra/http/middlewares/rateLimiter'

const app = express()

app.use(cors())
app.use(express.json())

//app.use(rateLimiter)

//app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use(errors())

app.use(errorMiddleware)

export { app }
