import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../config/token.js';

export const signUp = async (req, res) => {
    try {

        const {name, userName, email, password} = req.body;
    
        if (!name || !userName || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
    
        const existingUserEmail = await User.findOne({email});
        if (existingUserEmail) {
            return res.status(400).json({message: "Email already in use"});
        }
    
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }
    
        const existingUserName = await User.findOne({userName});
        if (existingUserName) {
            return res.status(400).json({message: "Username already in use"});
        }
        
        console.log('=== SIGNUP DEBUG ===')
        console.log('Original Password:', password)
    
    
        const salt = await bcrypt.genSalt(10);
        console.log('Generated Salt:', salt)
    
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashed password: ',hashedPassword);
        console.log('Hash length:', hashedPassword.length)
        console.log('=== END SIGNUP DEBUG ===')

        const newUser = await User.create({name, userName, email, password: hashedPassword});

        // Token generation done here
        const token = await generateToken(newUser._id)
        console.log('Generated Token:', token)
        
        // Set token in HTTP-only cookie so that we can prevent it from CSRF (Cross-Site Request Forgery) attacks
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict', // Adjust based on your client-server setup
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })
        
        res.status(201).json({newUser});

    } catch (error) {
        console.error('SignUp Error:', error)
        res.status(500).json({message: "Internal Server Error"})
    }
}


export const signIn = async (req, res) => {
    try {

        const { userName, password} = req.body;
    
        if ( !userName ||  !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        
        const existingUser = await User.findOne({userName})

        console.log('=== DEBUG INFO ===')
        console.log('Found user:', existingUser ? 'Yes' : 'No')
        console.log('Username from request:', userName)
        console.log('Password from request:', password)


        if (!existingUser) {
            return res.status(400).json({message: "Invalid username "})
        }

        console.log('Stored hashed password:', existingUser.password)
        console.log('Stored password length:', existingUser.password ? existingUser.password.length : 'N/A')
    
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        console.log('Password comparison result:', isPasswordCorrect)
        console.log('=== END DEBUG INFO ===')
        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid password"})
        }
        const token = await generateToken(existingUser._id)

        // Set token in HTTP-only cookie so that we can prevent it from CSRF (Cross-Site Request Forgery) attacks
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict', // Adjust based on your client-server setup
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })
        console.log('Generated Token:', token)

        res.status(200).json({existingUser});

    } catch (error) {
        console.error('SignIn Error:', error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}