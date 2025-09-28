import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js'
dotenv.config();
import authRouter from './routes/auth.route.js'
import userRouter from "./routes/user.route.js";
// We need to import cookie-parser to parse cookies from incoming requests why? Because we are storing JWT token in cookies
// This will help us to read the token from cookies for protected routes
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()
const PORT = process.env.PORT || 8000
// We are using express.json() middleware to parse JSON request bodies
// It allows us to access the data sent in the request body as req.body
app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:5173', // Allow requests from this origin (your frontend URL)
        credentials: true
    })
) // Enable CORS for all routes
app.use(cookieParser()) // Use cookie-parser middleware Why? To parse cookies from incoming requests




// Authentication routes
app.use('/api/auth', authRouter)
// User routes
app.use('/api/user', userRouter)

connectDB();

app.get('/', (req, res) => {
    res.send('Hello from Ashu Express server!')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})