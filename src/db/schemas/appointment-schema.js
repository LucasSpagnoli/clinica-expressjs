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
            type: Date,
            required: true
        },
        end_time: {
            type: Date,
            required: true
        }
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