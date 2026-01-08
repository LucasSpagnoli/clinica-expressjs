import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        matches: {
            options: /^[a-zA-Z\u00C0-\u00FF ]+$/i,
            errorMessage: 'Name must contain only letters and spaces'
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Name must have at least 5 characters'
        },
        notEmpty: {
            errorMessage: 'Name cannot be empty'
        },
    },
    email: {
        type: String,
        required: true,
        isEmail: { errorMessage: 'Invalid email' },
        normalizeEmail: true,
        custom: {
            options: async (email) => {
                const user = await User.findOne({ email: email })
                if (user) throw new Error('Email already in use')
            }
        }
    },
    password: {
        type: String,
        required: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters'
        }
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