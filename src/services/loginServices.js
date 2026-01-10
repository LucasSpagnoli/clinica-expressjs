import { User } from "../db/schemas/user-schema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import ServiceError from "../utils/ServiceError.js";

dotenv.config()

class LoginServices {
    async registerService(data) {
        try {
            return await User.create(data)
        } catch (err) {
            if (err.status) throw err;
            throw new ServiceError('Error registering', 500)
        }
    }

    async loginService(email, password) {
        try {
            const userDB = await User.findOne({ email: email })
            if (!userDB) throw new ServiceError('Invalid email or email not registered', 400)

            const correctPassword = await bcrypt.compare(password, userDB.password)
            if (!correctPassword) throw new ServiceError('Wrong password', 400)

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

            return { ...userDB.toObject(), accessToken: accessToken, refreshToken: refreshToken }
        } catch (err) {
            if (err.status) throw err;
            throw new ServiceError('Error logging in', 500)
        }
    }

    async refreshToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
            if (!decoded) throw new ServiceError('Invalid token', 401)

            const user = await User.findById(decoded.id)
            if (!user || !user.refresh_tokens.includes(token)) throw new ServiceError('Invalid or expired token', 403)

            return jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
        } catch (err) {
            if (err.status) throw err;
            throw new ServiceError('Error refreshing token', 500)
        }
    }

    async logout(id, refreshToken) {
        return await User.findByIdAndUpdate(id, { $pull: { refresh_tokens: refreshToken } })
    }
}

export default new LoginServices()