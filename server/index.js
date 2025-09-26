import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js'
dotenv.config();


const app = express()
// We are using express.json() middleware to parse JSON request bodies
// It allows us to access the data sent in the request body as req.body
app.use(express.json())
const PORT = process.env.PORT || 8000

connectDB();

app.get('/', (req, res) => {
    res.send('Hello from Ashu Express server!')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})