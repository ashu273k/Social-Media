import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { uploadPost } from '../controllers/post.controller.js'
import { upload } from '../middlewares/multer.js'
const postRouter = express.Router()


postRouter.post('/uploadPost',isAuth , upload.single('mediaUrl'), uploadPost )



export default postRouter