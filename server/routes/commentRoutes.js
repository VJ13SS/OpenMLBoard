import express from 'express'
import { addNewComment, deleteComment, getUserComment } from '../controllers/commentControllers.js'

const commentRouter = express.Router()

commentRouter.post('/add-new-comment',addNewComment)
commentRouter.post('/delete-comment',deleteComment)
commentRouter.post('/get-user-comment',getUserComment)

export default commentRouter