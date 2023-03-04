import 'dotenv/config'

import 'reflect-metadata'

import { errors } from 'celebrate'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import AppError from '@shared/errors/AppError'

import createConnection from '../typeorm'
import { routes } from './routes'

import '@shared/container'

createConnection()

const app = express()

app.use(express.json())
app.use(routes)

app.use(errors())

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError)
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message })

  console.log(err)

  return response
    .status(500)
    .json({ status: 'error', message: `Internal server ${err.message}` })
})

export default app
