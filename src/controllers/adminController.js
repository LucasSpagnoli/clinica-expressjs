import { User } from "../db/schemas/user-schema.js"
import { matchedData } from 'express-validator'
// const getDoctors = async (req, res) => {

// }

const createDoctor = async (req, res) => {
    const data = matchedData(req)
    const doctorData = {
        ...body,
        role: 'doctor'
    }
    const newDoc = await User.create(doctorData)
    return res.sendStatus(200)
}

export default {createDoctor}