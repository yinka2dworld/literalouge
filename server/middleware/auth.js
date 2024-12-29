import jwt from 'jsonwebtoken';

// Middleware to verify the token
export const tokenChecker = (req, res, next) => {
    const authHeader = req.get('Authorization'); // Retrieve Authorization header

    if (!authHeader) {
        // Respond with an error if no token is provided
        return res.status(401).json({ error: 'No token provided. Please log in.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token
    let decodedToken;

    try {
        // Verify the token
        decodedToken = jwt.verify(token, process.env.SECRET_STRING);

        if (!decodedToken) {
            return res.status(401).json({ error: 'Invalid token. Please log in again.' });
        }

        // Attach user data to the request object
        req.user = {
            id: decodedToken.id,
            role: decodedToken.role,
        };

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Handle token verification errors
        return res.status(400).json({ error: `Token verification failed: ${error.message}` });
    }
};

