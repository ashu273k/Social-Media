// This file is for connecting to the MongoDB database using Mongoose
import mongoose from 'mongoose'

// Function to connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.dbUrl);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

// Export the connectDB function for use in other parts of the application
export default connectDB;

// Why ? We create a separate file for database connection to keep the code modular and organized. This way, we can easily manage and reuse the database connection logic across different parts of the application.