import express from 'express'
import { getCurrentUser, getProfile } from '../controllers/user.controller.js'
import isAuth from '../middlewares/isAuth.js'

const userRouter = express.Router()


userRouter.get('/current', isAuth, getCurrentUser)
userRouter.get('/getprofile/:userName', getProfile)

export default userRouter