import { matchedData } from "express-validator"
import AppointmentsServices from "../services/appointmentsServices.js"


const createAppointment = async (req, res) => {
    try {
        const data = matchedData(req)
        const patientId = req.user.id
        const newApp = await AppointmentsServices.createAppointment(data, patientId)
        return res.status(201).json(newApp)
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message })
    }
}

const deleteAppointment = async (req, res) => {
    try {
        const id = req.params.id
        const patientId = req.user.id
        await AppointmentsServices.deleteAppointment(id, patientId)
        return res.status(200).json({ msg: 'Appointment deleted successfully' })
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message })
    }
}

const getAppointments = async (req, res) => {
    try {
        const id = req.user.id
        const role = req.user.role
        const myAppointments = await AppointmentsServices.getAppointments(id, role)
        return res.status(200).json(myAppointments)
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message })
    }
}

export default { getAppointments, createAppointment, deleteAppointment }