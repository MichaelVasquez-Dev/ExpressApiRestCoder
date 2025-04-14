import jwt from "jsonwebtoken";

const createToken = (payload) => {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
        return token;
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }
};

const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        return verify; 
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }
}

export { createToken, verifyToken };