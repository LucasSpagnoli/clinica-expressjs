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
        specialty: { type: String },
        availability: [{
            week_day: { type: Number, min: 0, max: 6 },
            start_time: {
                type: String,
                required: true,
                match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Please use HH:mm format (e.g. 07:00)']
            },
            end_time: {
                type: String,
                required: true,
                match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Please use HH:mm format (e.g. 17:00)']
            },
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