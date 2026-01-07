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
        isAlpha: {
            options: ['pt-BR'],
            errorMessage: 'Name must contain only letters'
        },
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