import { Router } from 'express'

const routes = new Router()

routes.get('./appointments', getAppointments)
routes.post('./appointments/create', createAppointment)
routes.post('./appointments/cancel', cancelAppointment)
// editar agendamento