import mongoose from "mongoose";
import dotenv from 'dotenv'
import { User } from "./src/db/schemas/user-schema.js";

dotenv.config()

const dbURI = process.env.DB_URI

const seedAdmin = async () => {
    try {
        await mongoose.connect(dbURI)
        const adminExists = await User.findOne({ role: 'admin' })
        if (adminExists) {
            console.log('There already is an admin')
            return
        }
        await User.create({
            name: 'administrator',
            email: 'admin@email.com',
            password: 'admin123',
            role: 'admin'
        })
        console.log('Admin created successfully')
    } catch (err) {
        console.log(err.message)
        return
    } finally {
        mongoose.connection.close()
    }
}

seedAdmin()
// node seedAdmin.js