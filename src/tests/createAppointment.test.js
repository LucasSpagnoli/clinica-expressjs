import appointmentsServices from "../services/appointmentsServices.js";
import { describe, it, vi, expect, afterEach } from 'vitest'

describe('Creating appointment', async () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('must got error because of invalid time', async () => {
        const mockData = {
            date: '2026-01-12T10:00:00Z',
            doctor_id: 'id-medico-123'
        };

        const { User } = await import("../db/schemas/user-schema.js");
        vi.spyOn(User, 'findById').mockResolvedValue({ // substitui a função de busca no banco e retorna esses dados abaixo:
            _id: 'id-doctor-123',
            role: 'doctor',
            doctor_info: {
                availability: [
                    { week_day: 2, start_time: '08:00', end_time: '12:00' }
                ]
            }
        });

        await expect(
            appointmentsServices.createAppointmentService(mockData, 'id-patient-123')
        ).rejects.toThrow('Doctor does not work at this time/day');
    });

    it('must got error because of another appointment at the same time', async () => {
        const mockData = {
            date: '2026-12-01T10:00:00Z',
            doctor_id: 'id-doctor-123'
        };

        const { User } = await import("../db/schemas/user-schema");
        vi.spyOn(User, 'findById').mockResolvedValue({
            _id: 'id-doctor-123',
            role: 'doctor',
            doctor_info: {
                availability: [
                    { week_day: 2, start_time: '08:00', end_time: '12:00' }
                ]
            }
        });

        const { Appointment } = await import("../db/schemas/appointment-schema.js")
        vi.spyOn(Appointment, 'findOne').mockResolvedValue({
            doctor_id: 'id-doctor-123',
            "date.start_time": '10:00'
        })

        await expect(
            appointmentsServices.createAppointmentService(mockData, 'id-patient-123')
        ).rejects.toThrow('Time slot already taken');
    });

    it('should create an appointment successfully when all data is valid', async () => {
        const validDoctorId = "65a1f2e3b4c5d6e7f8a9b0c1";
        const validPatientId = "65a1f2e3b4c5d6e7f8a9b0c2";

        const mockData = {
            date: '2026-12-01T10:00:00Z',
            doctor_id: validDoctorId
        };

        const { User } = await import("../db/schemas/user-schema.js");
        vi.spyOn(User, 'findById').mockResolvedValue({
            _id: validDoctorId,
            name: 'Dr. Doctor',
            role: 'doctor',
            doctor_info: {
                availability: [
                    { week_day: 2, start_time: '08:00', end_time: '12:00' }
                ]
            }
        });

        const { Appointment } = await import("../db/schemas/appointment-schema.js");
        vi.spyOn(Appointment, 'findOne').mockResolvedValue(null);
        const mockCreatedAppointment = {
            _id: 'id',
            doctor_id: validDoctorId,
            patient_id: validPatientId,
            date: { start_time: '10:00' }
        };
        vi.spyOn(Appointment, 'create').mockResolvedValue(mockCreatedAppointment);

        const result = await appointmentsServices.createAppointmentService(mockData, validPatientId);

        expect(result).toEqual({
            id: mockCreatedAppointment._id,
            date: mockCreatedAppointment.date,
            doctor: 'Dr. Doctor'
        });
        expect(Appointment.create).toHaveBeenCalled();
    });
})