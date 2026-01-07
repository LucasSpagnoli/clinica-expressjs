// const getDoctors = async (req, res) => {

// }
import { User } from "../db/schemas/user-schema.js"

const createDoctor = async (req, res) => {
    const doctorData = {
        ...req.body,
        role: 'doctor'
    }
    const newDoc = await User.create(doctorData)
    return res.sendStatus(200)
}

export default {createDoctor}