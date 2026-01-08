import { Router } from 'express'
import adminRoutes from './admin.js'
import loginRoutes from './login.js'

const routes = new Router()

routes.use(adminRoutes)
routes.use(loginRoutes)

export default routes