import { User } from "../db/schemas/user-schema.js"
import { matchedData } from 'express-validator'

const getDoctors = async (req, res) => {
    const doctors = await User.find({ role: 'doctor' }).select('-password -createdAt -updatedAt -__v')
    if (doctors.length === 0) return res.status(200).send('No doctors found')
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
        return res.status(201).send('Doctor created with success')
    } catch (err) {
        return res.status(400).send(err.message)
    }
}

const updateDoctor = async (req, res) => {
    try {
        const data = matchedData(req)
        const id = req.params.id
        const updDoctor = await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })
        if (!updDoctor) {
            return res.status(404).json({ error: "Dctor not found" });
        }
        return res.status(201).send(`Dr. ${updDoctor.name} updated with success`)
    } catch (err) {
        return res.status(400).send(err.message)
    }
}

const deleteDoctor = async (req, res) => {
    try {
        const id = req.params.id
        const delDoctor = await User.findByIdAndDelete(id)
        if (!delDoctor) res.status(400).send('Doctor not found')
        return res.status(200).send('Doctor deleted with success')
    } catch (err) {
        res.status(400).send(err.message)
    }
}

export default { createDoctor, getDoctors, updateDoctor, deleteDoctor }