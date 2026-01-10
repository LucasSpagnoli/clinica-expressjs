import express from 'express'
import { connectDB } from './db/connection.js'
import dotenv from 'dotenv'
import routes from './routes/routes.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

connectDB()

app.use(express.json())
app.use(routes)
app.use(errorMiddleware)

app.listen(port, () => {
    console.log('rodando')
})