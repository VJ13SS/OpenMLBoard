import express from 'express'
import { getAllProjects, getProjectDetails, getUserProjects } from '../controllers/projectControllers.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const projectRouter = express.Router()

projectRouter.get('/get-projects',getAllProjects)
projectRouter.get('/get-user-projects',authMiddleware,getUserProjects)
projectRouter.post('/get-project-details',getProjectDetails)
export default projectRouter