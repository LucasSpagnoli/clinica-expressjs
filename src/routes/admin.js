import { Router } from 'express'
import adminController from '../controllers/adminController.js'

const adminRoutes = new Router()

// routes.get('./admin/doctors', getDoctors)
adminRoutes.post('/admin/create', adminController.createDoctor)
// routes.put('./admin/update', updateDoctor)
// routes.delete('./admin/delete', deleteDoctor)

export default adminRoutes