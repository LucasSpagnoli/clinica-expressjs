import { matchedData } from "express-validator"
import AppointmentsServices from "../services/appointmentsServices.js"


const createAppointment = catchAsync(async (req, res) => {
    const data = matchedData(req)
    const patientId = req.user.id
    const newApp = await AppointmentsServices.createAppointment(data, patientId)
    return res.status(201).json(newApp)
})

const deleteAppointment = catchAsync(async (req, res) => {
    const id = req.params.id
    const patientId = req.user.id
    await AppointmentsServices.deleteAppointment(id, patientId)
    return res.status(200).json({ msg: 'Appointment deleted successfully' })
})

const getAppointments = catchAsync(async (req, res) => {
    const id = req.user.id
    const role = req.user.role
    const myAppointments = await AppointmentsServices.getAppointments(id, role)
    return res.status(200).json(myAppointments)
})

export default { getAppointments, createAppointment, deleteAppointment }