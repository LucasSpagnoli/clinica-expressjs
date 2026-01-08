import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'doctor', 'patient'],
        default: 'patient'
    },
    doctor_info: {
        specialty: {
            type: String,
        },
        availability: {
            week_days: String,
            start_time: String,
            end_time: String
        }
    },
}, {
    timestamps: true,
})

UserSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'doctor_id'
});

export const User = mongoose.model('User', UserSchema)