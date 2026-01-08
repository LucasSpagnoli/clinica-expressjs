import { Router } from 'express'
import loginController from '../controllers/loginController.js'
import { checkSchema } from 'express-validator'
import userSchema from '../middleware/validatorsSchemas/userSchema.js'
import { handleValidation } from '../middleware/handleValidation.js'

const loginRoutes = new Router()

loginRoutes.post('/register', checkSchema(userSchema.createUserSchema), handleValidation, loginController.register)
loginRoutes.post('/login', loginController.login)
// routes.post('./logout', logout)

export default loginRoutes