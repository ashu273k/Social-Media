import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRouter from './routes/auth.routes.js'

dotenv.config()

const app = express()
const PORT = 8000
app.use(express.json())


// Authentication routes
app.use('/api/auth', authRouter);

connectDB()
app.get('/', (req, res) => {
    res.send('Hello from social server!')
})

app.listen(PORT, () => {
    console.log(`Social server is running on http://localhost:${PORT}`)
})