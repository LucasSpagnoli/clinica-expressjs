import { User } from "../db/schemas/user-schema.js"
import { Appointment } from "../db/schemas/appointment-schema.js"
import ServiceError from "./ServiceError.js"

class AppointmentServices {

    async createAppointment(data, patientId) {
        try {
            const startTimeDate = new Date(data.date)

            const diaSemana = startTimeDate.getUTCDay();
            const horaMinutoStart = startTimeDate.getUTCHours().toString().padStart(2, '0') + ":" +
                startTimeDate.getUTCMinutes().toString().padStart(2, '0');

            const endTimeDate = new Date(startTimeDate.getTime() + 1 * 60 * 60 * 1000)
            const horaMinutoEnd = endTimeDate.getUTCHours().toString().padStart(2, '0') + ":" +
                endTimeDate.getUTCMinutes().toString().padStart(2, '0');

            const doctor = await User.findById(data.doctor_id)
            if (!doctor) throw new ServiceError('Doctor not found', 404);
            if (doctor.role !== 'doctor') throw new ServiceError('Appointments must be with a doctor', 400)

            const isAvailable = doctor.doctor_info?.availability.find(a =>
                Number(a.week_day) === diaSemana &&
                horaMinutoStart >= a.start_time &&
                horaMinutoStart < a.end_time
            );
            if (!isAvailable) throw new ServiceError('Doctor does not work at this time/day', 400)

            const conflict = await Appointment.findOne({
                doctor_id: data.doctor_id,
                "date.start_time": horaMinutoStart
            });
            if (conflict) throw new ServiceError('Time slot already taken', 409)

            const appointmentData = {
                doctor_id: data.doctor_id,
                patient_id: patientId,
                date: {
                    start_time: horaMinutoStart,
                    end_time: horaMinutoEnd
                }
            }

            const newApp = await Appointment.create(appointmentData)

            return {
                id: newApp._id,
                date: newApp.date,
                doctor: doctor.name
            }
        } catch (err) {
            if (err.status) throw err;
            throw new ServiceError('Error creating appointment', 500)
        }
    }

    async deleteAppointment(id, patientId) {
        try {
            const app = await Appointment.findById(id)
            if (!app) throw new ServiceError('Appointment not found', 404)
            if (app.patient_id.toString() !== patientId) throw new ServiceError('Not authorized to delete this appointment', 403)

            const agora = new Date()
            const dataConsulta = new Date(app.date.start_time)
            const agora24h = new Date(agora.getTime() + 24 * 60 * 60 * 1000);
            if (dataConsulta <= agora24h) throw new ServiceError('The appointment must be cancelled more than 24 hours in advance.', 400)

            return await Appointment.findByIdAndDelete(id)
        } catch (err) {
            if (err.status) throw err;
            throw new ServiceError('Error deleting appointment', 500)
        }
    }

    async getAppointments(id, role) {
        try {
            if (role === 'patient') {
                return await Appointment.find({ patient_id: id }).populate('doctor_id', 'name doctor_info.specialty')
            } else if (role === 'doctor') {
                return await Appointment.find({ doctor_id: id }).populate('patient_id', 'name')
            } else {
                return await Appointment.find().select('-patient_id -doctor_id')
            }
        } catch (err) {
            if (err.status) throw err;
            throw new ServiceError('Error getting appointments', 500)
        }
    }
}

export default new AppointmentServices()