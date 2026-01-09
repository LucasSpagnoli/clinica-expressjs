import { Router } from 'express'
import adminController from '../controllers/adminController.js'
import { checkSchema } from 'express-validator'
import userSchema from '../db/validatorsSchemas/userSchema.js'
import { handleValidation } from '../middleware/handleValidation.js'
import authValidation from '../middleware/authValidation.js'

const adminRoutes = new Router()

adminRoutes.use(authValidation.authToken)
adminRoutes.use(authValidation.isAdmin)

adminRoutes.get('/doctors', adminController.getDoctors)
adminRoutes.delete('/delete/:id', adminController.deleteDoctor)
adminRoutes.post('/create', checkSchema(userSchema.createUserSchema), handleValidation, adminController.createDoctor)
adminRoutes.put('/update/:id', checkSchema(userSchema.updateUserSchema), handleValidation, adminController.updateDoctor)

export default adminRoutes