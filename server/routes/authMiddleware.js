// authMiddleware.js
import jwt from 'jsonwebtoken';
const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId; // Attach the user ID to the request
        next(); // Proceed to the next middleware/route handler
    });
};