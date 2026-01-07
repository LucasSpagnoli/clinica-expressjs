export const userSchema = {
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
            options: /^[a-zA-Z\u00C0-\u00FF ]+$/i, // letras, acentos e espaços
            errorMessage: 'Name must contain only letters and spaces'
        }
    },
    email: {
        isEmail: {
            errorMessage: 'Invalid email address'
        },
        normalizeEmail: true
    },
    password: {
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters'
        },
    }
}