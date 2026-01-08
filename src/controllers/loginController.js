import { matchedData } from "express-validator"
import bcrypt from 'bcrypt'
import { User } from "../db/schemas/user-schema.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const register = async (req, res) => {
    try {
        const data = matchedData(req)
        const newLogin = await User.create(data)
        console.log('Succesfully registered')
        return res.status(201).json({ name: newLogin.name, email: newLogin.email })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const login = async (req, res) => {
    try {
        const userDB = await User.findOne({ email: req.body.email })
        if (!userDB) return res.status(400).json({ msg: 'Invalid email or email not registered' })

        const correctPassword = await bcrypt.compare(req.body.password, userDB.password)
        if (!correctPassword) return res.status(400).json({ msg: 'Wrong password' })

        const tokenData = {
            id: userDB._id,
            role: userDB.role
        }
        const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' })

        console.log('Succesfully logged in')
        return res.status(201).json({
            id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            token: accessToken
        })
    } catch (err) {
        return res.json(err.message)
    }
}

const logout = async (req, res) => {
    
}

export default { register, login }