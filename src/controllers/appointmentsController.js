import { matchedData } from "express-validator"
import { Appointment } from "../db/schemas/appointment-schema.js"
import { User } from "../db/schemas/user-schema.js"

const createAppointment = async (req, res) => {
    try {
        const data = matchedData(req)
        const endTime = new Date(data.date.getTime() + 1 * 60 * 60 * 1000)
        const startTime = new Date(data.date)
        const doctor = await User.findById(data.doctor_id)
        
        const appointmentData = {
            ...data,
            start_time: startTime,
            end_time: endTime,
            patient_id: req.user.id,
        }
        
        let newAppData = await Appointment.create(appointmentData)
        newAppData = { date: newAppData.toObject().date, id: newAppData.toObject()._id }
        const newApp = {
            ...newAppData,
            doctor: doctor.name
        }

        console.log('Appointment created successfully')
        return res.status(201).json(newApp)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const deleteAppointment = async (req, res) => {
    try {
        const id = req.params.id

        const app = await Appointment.findById(id)
        if (!app) return res.status(404).json({ error: 'Appointment not found' })
        if (app.patient_id.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to delete this appointment' })
        }

        const agora = new Date()
        const dataConsulta = new Date(app.date)
        const agora24h = new Date(agora.getTime() + 24 * 60 * 60 * 1000);
        if (dataConsulta <= agora24h) {
            return res.status(400).json({ error: "The appointment must be cancelled more than 24 hours in advance." });
        }

        await Appointment.findByIdAndDelete(id)
        return res.status(200).json({ msg: 'Appointment deleted successfully' })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// const getDocAppointments

const getAppointments = async (req, res) => {
    try {
        const id = req.user.id
        const role = req.user.role
        let myAppointments = { appointments: [] }
        if (role === 'patient') {
            myAppointments = await Appointment.find({ patient_id: id }).populate('doctor_id', 'name doctor_info.specialty')
        } else if (role === 'doctor') {
            myAppointments = await Appointment.find({ doctor_id: id }).populate('patient_id', 'name')
        } else {
            myAppointments = await Appointment.find().select('-patient_id -doctor_id')
        }
        return res.status(200).json(myAppointments)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export default { getAppointments, createAppointment, deleteAppointment }