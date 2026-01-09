import { User } from "../db/schemas/user-schema.js"
import { matchedData } from 'express-validator'
import AdminServices from "../services/adminServices.js"

const getDoctors = async (req, res) => {
    try {
        const doctors = await AdminServices.getDBDoctors()
        return res.status(200).json(doctors)
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}

const createDoctor = async (req, res) => {
    try {
        const data = matchedData(req)
        const newDoc = await AdminServices.createDBDoctor(data)
        return res.status(201).json(newDoc)
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message })
    }
}

const updateDoctor = async (req, res) => {
    try {
        const data = matchedData(req)
        const id = req.params.id
        const updDoctor = await AdminServices.updateDBDoctor(id, data)
        return res.status(200).json(updDoctor)
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message })
    }
}

const deleteDoctor = async (req, res) => {
    try {
        const id = req.params.id
        await AdminServices.deleteDBDoctor(id)
        return res.status(200).json({ msg: 'Doctor deleted successfully' })
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message })
    }
}

export default { createDoctor, getDoctors, updateDoctor, deleteDoctor }