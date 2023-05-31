import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/User/user.router'

const app: Application = express()
app.use(cors())
//parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// const port = 3000

// application routes
app.use('/api/v1/users/', userRouter)
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
