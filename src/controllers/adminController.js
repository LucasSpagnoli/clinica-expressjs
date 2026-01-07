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
        return res.status(201).send('Doutor criado com sucesso')
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
            return res.status(404).json({ error: "Médico não encontrado" });
        }
        return res.status(201).send(`Doutor ${updDoctor.name} atualizado com sucesso`)
    } catch (err) {
        return res.status(400).send(err.message)
    }
}

export default { createDoctor, getDoctors, updateDoctor }