import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authToken = (req, res, next) => {
    try {
        const header = req.headers
        if (!header) return res.status(401).json({ msg: 'Invalid token, login again' })
        const token = header['authorization'].split(' ')[1]
        if (!token) return res.status(401).send({ msg: 'Invalid token, login again' })
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decoded) return res.status(401).send({ msg: 'Invalid token' })
        req.user = {
            id: decoded.id,
            role: decoded.role
        }
        next()
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const isAdmin = (req, res, next) => {
    try {
        if (!(req.user.role === 'admin')) return res.status(403).send({ msg: "You need permission to go further" })
        next()
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}
export default { authToken, isAdmin }