import { User } from "../db/schemas/user-schema.js"
import { matchedData } from 'express-validator'

const getDoctors = async (req, res) => {
    const doctors = await User.find({ role: 'doctor' }).select('-password -createdAt -updatedAt -__v')
    if (!doctors) return res.status(200).send('No doctors found')
    return res.json(doctors)
}

const createDoctor = async (req, res) => {
    try {
        const data = matchedData(req)
        const doctorData = {
            ...data,
            role: 'doctor'
        }
        const newDoc = await User.create(doctorData)
        return res.sendStatus(200)
    } catch (err) {
        return res.send(err)
    }
}

export default { createDoctor, getDoctors }