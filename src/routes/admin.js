import { Router } from 'express'
import adminController from '../controllers/adminController.js'
import { checkSchema } from 'express-validator'
import userSchema from '../middleware/validatorsSchemas/userSchema.js'
import { handleValidation } from '../middleware/handleValidation.js'

const adminRoutes = new Router()

adminRoutes.get('/admin/doctors', /* tokenAuth, isAdmin, */ adminController.getDoctors)
adminRoutes.post('/admin/create', /* tokenAuth, isAdmin, */ checkSchema(userSchema.createUserSchema), handleValidation, adminController.createDoctor)
adminRoutes.put('/admin/update/:id', /* tokenAuth, isAdmin, */ checkSchema(userSchema.updateUserSchema), handleValidation, adminController.updateDoctor)
adminRoutes.delete('/admin/delete/:id', /* tokenAuth, isAdmin, */ adminController.deleteDoctor)

export default adminRoutes