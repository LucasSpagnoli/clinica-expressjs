import { Router } from 'express'
import adminRoutes from './admin.js'

const routes = new Router()

routes.use(adminRoutes)

export default routes