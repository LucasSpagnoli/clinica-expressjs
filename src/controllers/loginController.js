import { matchedData } from "express-validator"
import bcrypt from 'bcrypt'
import { User } from "../db/schemas/user-schema.js"

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
        console.log(req.body.password)
        console.log(userDB.password)
        const correctPassword = await bcrypt.compare(req.body.password, userDB.password)
        console.log(correctPassword)
        if (!correctPassword) return res.status(400).json({ msg: 'Wrong password' })
        console.log('Succesfully logged in')
        return res.status(201).json({
            id: userDB._id,
            name: userDB.name,
            email: userDB.email,
        })
    } catch (err) {
        return res.json(err.message)
    }
}

export default { register, login }