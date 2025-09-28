// This is the middleware for the authorisation using JWT tokens
import jwt from 'jsonwebtoken'

const isAuth = async (req, res, next) => {

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({message: "Not authorized, no token"})
    } 

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // We are extracting the user ID from the decoded token and attaching it to the req object
        // This will allow us to access the user ID in the subsequent route handlers
        req.userId = decoded.id
        next()

    } catch (error) {
        console.error('Auth Middleware Error:', error)
        res.status(401).json({message: "Unauthorized"})
    }
}

export default isAuth