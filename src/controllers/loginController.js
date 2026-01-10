import { matchedData } from "express-validator"
import LoginServices from "../services/loginServices.js"
import { catchAsync } from "../utils/catchAsync.js"

const register = catchAsync(async (req, res) => {
    const data = matchedData(req)
    const newLogin = await LoginServices.registerService(data)
    return res.status(201).json({
        name: newLogin.name,
        email: newLogin.email,
        id: newLogin._id
    })
})

const login = catchAsync(async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const loggedUser = await LoginServices.loginService(email, password)

    return res.status(201).json({
        id: loggedUser._id,
        name: loggedUser.name,
        email: loggedUser.email,
        access_token: loggedUser.accessToken,
        refresh_token: loggedUser.refreshToken
    })
})

const refreshToken = catchAsync(async (req, res) => {
    const header = req.headers
    if (!header) return res.status(401).json({ msg: 'Invalid token, login again' })

    const token = header['authorization'].split(' ')[1]
    if (!token) return res.status(401).json({ msg: 'Invalid token, login again' })

    const newAccessToken = await LoginServices.refreshToken(token)
    return res.status(200).json({ accessToken: newAccessToken })
})

const logout = catchAsync(async (req, res) => {
    const id = req.user.id
    const refreshToken = req.body.refreshToken
    await LoginServices.logout(id, refreshToken)
    return res.status(200).json({ msg: 'Logged out succesfully' })
})

export default { register, login, refreshToken, logout }