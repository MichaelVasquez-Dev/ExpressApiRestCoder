import { verifyToken } from "../helpers/token.helper";

const isAdmin = (req, res, next) => {
    try {
        const headers = req.headers.authorization;
        if (!headers || !headers.startsWith("Bearer")) {
            const error = new Error("Token no válido o no existe");
            error.status = 403;
            throw error;
        }

        const token = headers.split(" ")[1];
        const user = verifyToken(token);
        if( user.role != "ADMIN") new Error("No tienes permisos para acceder a esta ruta");
        next();
    } catch (error) {
        next(error);
    }
};

export default isAdmin;