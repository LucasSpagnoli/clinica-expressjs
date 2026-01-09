import { Router } from 'express'
import appointmentsController from '../controllers/appointmentsController.js'
import { checkSchema } from 'express-validator'
import appointmentSchema from '../db/validatorsSchemas/appointmentSchema.js'
import { handleValidation } from '../middleware/handleValidation.js'
import authValidation from '../middleware/authValidation.js'

const appointmentRoutes = new Router()

appointmentRoutes.use(authValidation.authToken)

appointmentRoutes.get('/appointments', appointmentsController.getAppointments)
appointmentRoutes.delete('/delete/:id', appointmentsController.deleteAppointment)
appointmentRoutes.post('/create', checkSchema(appointmentSchema.createAppointmentSchema), handleValidation, appointmentsController.createAppointment)

export default appointmentRoutes