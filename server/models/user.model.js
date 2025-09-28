// We write name like this because it is really easy to understand and maintain
import mongoose from 'mongoose';

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    profilePicture: { type: String, default: '' },
    bio: { type: String, default: '' },
    followers: [],
    following: [],
    posts: [],
    reels: [],
    stories: []
})

// Create the User model based on the schema
const User = mongoose.model('User', UserSchema)

export default User;