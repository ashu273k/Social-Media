import jwt from 'jsonwebtoken'

export const generateToken = async (userid) => {
    try {
        const token =  jwt.sign({ id: userid }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        if (!token) {
            throw new Error('Token generation failed');
        }
        return token;
    } catch (error) {
        console.error('Token Generation Error:', error);
        throw new Error('Token generation failed');
    }
}