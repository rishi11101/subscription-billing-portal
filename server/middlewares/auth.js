import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // Get token from the "Authorization: Bearer <token>" header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;   // id and plan

        next();
        
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
};