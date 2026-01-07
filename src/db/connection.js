import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbURI = process.env.DB_URI

export const connectDB = async () => {
    try {
        await mongoose.connect(dbURI)
        console.log('Database connected!')
        console.log(`Database: ${mongoose.connection.name}`)
    } catch (err) {
        console.log(`Database error: ${err}`)
        process.exit(1)
    }
}
