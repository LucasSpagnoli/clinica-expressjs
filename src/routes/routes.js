import { Router } from 'express'
import adminRoutes from './admin.js'
import loginRoutes from './login.js'
import appointmentRoutes from './appointments.js'

const routes = new Router()

routes.use('/admin', adminRoutes)
routes.use('/appointments', appointmentRoutes)
routes.use(loginRoutes)

export default routes