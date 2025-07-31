import express from "express";
import { addNewProject, getAuthorDetails, loginUser, registerUser, searchContent, updateUserProfile } from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const userRouter = express.Router()

userRouter.post('/sign-in',registerUser)
userRouter.post('/log-in',loginUser)
userRouter.post('/add-new-project',authMiddleware,addNewProject)
userRouter.post('/get-author-details',getAuthorDetails)
userRouter.post('/update-user-profile',updateUserProfile)
userRouter.get('/search',searchContent)


export default userRouter