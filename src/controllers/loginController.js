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

        const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
        const refreshToken = jwt.sign({ id: userDB._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
        await User.findByIdAndUpdate(userDB._id, {
            $push: {
                refresh_tokens: {
                    $each: [refreshToken], // adiciona novo token
                    $slice: -5 // mantém apenas últimos 5 tokens no banco
                }
            }
        }, { new: true })

        console.log('Succesfully logged in')
        return res.status(201).json({
            id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            access_token: accessToken,
            refresh_token: refreshToken
        })
    } catch (err) {
        return res.status(500).json(err.message)
    }
}

const refreshToken = async (req, res) => {
    const header = req.headers
    if (!header) return res.status(401).json({ msg: 'Invalid token, login again' })

    const token = header['authorization'].split(' ')[1]
    if (!token) return res.status(401).json({ msg: 'Invalid token, login again' })

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        if (!decoded) return res.status(401).json({ msg: 'Invalid token' })

        const user = await User.findById(decoded.id)
        if (!user || !user.refresh_tokens.includes(token)) return res.status(403).json({ msg: 'Token inválido ou expirado' });

        const newAccessToken = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
        res.json({ accessToken: newAccessToken })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { $pull: { refresh_tokens: req.body.refreshToken } })
        return res.status(200).json({ msg: 'Logged out succesfully' })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

export default { register, login, refreshToken, logout }