import mongoose from 'mongoose'

const AppointmentSchema = new mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        start_time: {
            type: String,
            match: /^([01]\d|2[0-3]):([0-5]\d)$/
        },
        end_time: {
            type: String,
            match: /^([01]\d|2[0-3]):([0-5]\d)$/
        },
        _id: false
    },
    status: {
        type: String,
        default: 'scheduled'
    }
}, {
    timestamps: true,
    toJSON: true,
    toObject: true
})

export const Appointment = mongoose.model('Appointment', AppointmentSchema)