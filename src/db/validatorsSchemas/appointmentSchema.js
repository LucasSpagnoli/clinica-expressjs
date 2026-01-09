const createAppointmentSchema = {
    doctor_id: {
        notEmpty: {
            errorMessage: "Doctor ID is required"
        },
        isMongoId: {
            errorMessage: "Invalid Doctor ID format"
        }
    },
    date: {
        isISO8601: {
            errorMessage: "Invalid date. It has to be in ISO format (YYYY-MM-DDTHH:mm:ssZ)"
        },
        toDate: {},
        custom: {
            options: (value) => {
                const dataAgendamento = new Date(value);
                const agora = new Date();
                if (dataAgendamento <= agora) {
                    throw new Error("The appointment must be in the future");
                }
                return true;
            }
        }
    }
}

export default { createAppointmentSchema }