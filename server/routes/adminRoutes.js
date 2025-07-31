import express from 'express'
import { getPendingProjects, reviewProjects } from '../controllers/adminControllers.js'

const adminRouter = express.Router()

adminRouter.post('/review-project',reviewProjects)
adminRouter.get('/get-pending-projects',getPendingProjects)


export default adminRouter