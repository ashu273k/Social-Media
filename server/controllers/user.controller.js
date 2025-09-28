import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    // Assuming user info is stored in req.user by authentication middleware
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {

        const verifiedUser = await User.findById(userId).select('-password'); // Exclude password field
        res.json(verifiedUser)

    } catch (error) {  
        console.error('Get Current User Error:', errror)
        res.status(500).json({message: "Internal Server Error"})
    }
        
}