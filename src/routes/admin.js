import { Router } from 'express'
import adminController from '../controllers/adminController.js'
import { checkSchema } from 'express-validator'
import { userSchema } from '../middleware/validatorsSchemas/userSchema.js'
import { handleValidation } from '../middleware/handleValidation.js'

const adminRoutes = new Router()

// routes.get('./admin/doctors', getDoctors)
adminRoutes.post('/admin/create', checkSchema(userSchema), handleValidation, adminController.createDoctor)
// routes.put('./admin/update', updateDoctor)
// routes.delete('./admin/delete', deleteDoctor)

export default adminRoutes