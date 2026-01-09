import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refresh_tokens: [{
        type: String
    }],
    role: {
        type: String,
        enum: ['admin', 'doctor', 'patient'],
        default: 'patient'
    },
    doctor_info: {
        specialty: {
            type: String,
        },
        availability: [{
            week_day: String,
            start_time: String,
            end_time: String,
            _id: false
        }]
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

UserSchema.virtual('doctor_appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'doctor_id'
});

UserSchema.virtual('patient_appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'patient_id'
});

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

export const User = mongoose.model('User', UserSchema)