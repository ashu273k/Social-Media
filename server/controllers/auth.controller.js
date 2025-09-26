import User from '../models/user.model.js'

export const signUp = async (req, res) => {
    const {name, userName, email, password} = req.body;

    if (!name || !userName || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    const existingUserEmail = await User.findOne({email});
    if (existingUserEmail) {
        return res.status(400).json({message: "Email already in use"});
    }

    const existingUserName = await User.findOne({userName});
    if (existingUserName) {
        return res.status(400).json({message: "Username already in use"});
    }

    await User.create({name, userName, email, password});
    res.status(201).json({message: "User created successfully"});
}