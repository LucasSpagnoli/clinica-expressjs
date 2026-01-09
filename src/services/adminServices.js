import { User } from "../db/schemas/user-schema.js"
import ServiceError from "./ServiceError.js"

class AdminServices {

    async getDBDoctors() {
        try {
            return await User.find({ role: 'doctor' }).select('-password -createdAt -updatedAt -__v')
        } catch (err) {
            throw new ServiceError('Error fetching doctors from database', 500)
        }
    }

    async createDBDoctor(data) {
        try {
            const doctorData = {
                ...data,
                role: 'doctor'
            }
            return await User.create(doctorData)
        } catch (err) {
            throw new ServiceError('Error creating doctor', 500)
        }
    }

    async updateDBDoctor(id, data) {
        try {
            const updDoc = await User.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true
            }).select('-password')
            if (!updDoc) throw new ServiceError('Doctor not found', 404)
            return updDoc
        } catch (err) {
            if (err.status) throw err;
            throw new ServiceError('Error updating doctor', 500)
        }
    }

    async deleteDBDoctor(id) {
        try {
            const delDoctor = await User.findByIdAndDelete(id)
            if (!delDoctor) throw new ServiceError('Doctor not found', 404)
            return delDoctor
        } catch (err) {
            if (err.status) throw err;
            throw new ServiceError('Error deleting doctor', 500)
        }
    }
}

export default new AdminServices()