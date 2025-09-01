import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config()

const app = express()
const PORT = 8000

connectDB()
app.get('/', (req, res) => {
    res.send('Hello from social server!')
})

app.listen(PORT, () => {
    console.log(`Social server is running on http://localhost:${PORT}`)
})