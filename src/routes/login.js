import { Router } from 'express'
import loginController from '../controllers/loginController.js'
import { checkSchema } from 'express-validator'
import userSchema from '../middleware/validatorsSchemas/userSchema.js'
import { handleValidation } from '../middleware/handleValidation.js'
import authValidation from '../middleware/authValidation.js'

const loginRoutes = new Router()

loginRoutes.post('/register', checkSchema(userSchema.createUserSchema), handleValidation, loginController.register)
loginRoutes.post('/login', loginController.login)
loginRoutes.post('/refresh-token', loginController.refreshToken)
loginRoutes.post('/logout', authValidation.authToken, loginController.logout)

export default loginRoutes