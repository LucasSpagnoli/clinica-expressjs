import { matchedData } from 'express-validator'
import AdminServices from "../services/adminServices.js"
import { catchAsync } from '../utils/catchAsync.js'

const getDoctors = catchAsync(async (req, res) => {
    const doctors = await AdminServices.getDBDoctors()
    return res.status(200).json(doctors)
})

const createDoctor = catchAsync(async (req, res) => {
    const data = matchedData(req)
    const newDoc = await AdminServices.createDBDoctor(data)
    return res.status(201).json(newDoc)
})

const updateDoctor = catchAsync(async (req, res) => {
    const data = matchedData(req)
    const id = req.params.id
    const updDoctor = await AdminServices.updateDBDoctor(id, data)
    return res.status(200).json(updDoctor)
})

const deleteDoctor = catchAsync(async (req, res) => {
    const id = req.params.id
    await AdminServices.deleteDBDoctor(id)
    return res.status(200).json({ msg: 'Doctor deleted successfully' })
})

export default { createDoctor, getDoctors, updateDoctor, deleteDoctor }