import { Router } from 'express'

const routes = new Router()

routes.post('./register', register)
routes.post('./login', login)
routes.post('./logout', logout)