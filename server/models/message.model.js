// We write name like this because it is really easy to understand and maintain
import mongoose from 'mongoose';

// Define the schema for the User model
const MessageSchema = new mongoose.Schema({
    
})

// Create the User model based on the schema
const Message = mongoose.model('message', MessageSchema)

export default Message;