import { User } from "../db/schemas/user-schema.js"
import { matchedData } from 'express-validator'

const getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' }).select('-password -createdAt -updatedAt -__v')
        return res.status(200).json(doctors)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const createDoctor = async (req, res) => {
    try {
        const data = matchedData(req)
        const doctorData = {
            ...data,
            role: 'doctor'
        }
        const newDoc = await User.create(doctorData)
        console.log('Doctor created successfully')
        return res.status(201).json(newDoc)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const updateDoctor = async (req, res) => {
    try {
        const data = matchedData(req)
        const id = req.params.id
        const updDoctor = await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        }).select('-password')

        if (!updDoctor) {
            return res.status(404).json({ error: "Dctor not found" });
        }

        console.log(`Dr. ${updDoctor.name} updated successfully`)
        return res.status(200).json(updDoctor)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const deleteDoctor = async (req, res) => {
    try {
        const id = req.params.id
        const delDoctor = await User.findByIdAndDelete(id)
        if (!delDoctor) return res.status(404).json({ error: 'Doctor not found' })
        return res.status(200).json({ msg: 'Doctor deleted successfully' })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export default { createDoctor, getDoctors, updateDoctor, deleteDoctor }