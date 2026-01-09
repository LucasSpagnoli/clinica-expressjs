import { User } from "../schemas/user-schema.js"

const createUserSchema = {
    name: {
        trim: true,
        notEmpty: {
            errorMessage: 'Name cannot be empty'
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Name must have more than 5 characters'
        },
        matches: {
            options: /^[a-zA-Z\u00C0-\u00FF ]+$/i,
            errorMessage: 'Name must contain only letters and spaces'
        }
    },
    email: {
        isEmail: {
            errorMessage: 'Invalid email address'
        },
        normalizeEmail: true,
        custom: {
            options: async (value) => {
                const user = await User.findOne({ email: value })
                if (user) throw new Error('Email already in use')
            }
        }
    },
    password: {
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters'
        },
        notEmpty: {
            errorMessage: "Senha é obrigatória"
        }
    },

    "doctor_info.specialty": {
        optional: true,
        isString: { errorMessage: "Specialty must be text" },
        trim: true,
        notEmpty: { errorMessage: "Specialty cannot be empty" }
    },
    "doctor_info.availability": {
        optional: true,
    },
    "doctor_info.availability.*.week_day": {
        optional: true,
    },
    "doctor_info.availability.*.start_time": {
        optional: true,
        matches: {
            options: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            errorMessage: "Start time must be in HH:MM format"
        }
    },
    "doctor_info.availability.*.end_time": {
        optional: true,
        matches: {
            options: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            errorMessage: "End time must be in HH:MM format"
        }
    }
}

const updateUserSchema = {
    name: {
        optional: true,
        trim: true,
        notEmpty: true,
        isLength: { options: { min: 5 } },
        matches: { options: /^[a-zA-Z\u00C0-\u00FF ]+$/i }
    },
    email: {
        optional: true,
        isEmail: true,
        normalizeEmail: true,
        custom: {
            options: async (value, { req }) => {
                const id = req.params.id
                const user = await User.findOne({ email: value })
                if (user) {
                    if (user._id.toString() !== id) throw new Error('Email already in use')
                }
            }
        }
    },
    password: {
        optional: true,
        isLength: { options: { min: 8 } }
    },
    "doctor_info.specialty": {
        optional: true,
        isString: true,
        trim: true
    },
    "doctor_info.availability": {
        optional: true,
    },
    "doctor_info.availability.*.week_days": {
        optional: true,
        isString: true,
        notEmpty: true
    },
    "doctor_info.availability.*.start_time": {
        optional: true,
        matches: {
            options: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            errorMessage: "Format HH:MM required"
        }
    },
    "doctor_info.availability.*.end_time": {
        optional: true,
        matches: {
            options: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            errorMessage: "Format HH:MM required"
        }
    }
}

export default { createUserSchema, updateUserSchema }