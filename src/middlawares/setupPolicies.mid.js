import { verifyToken } from "../helpers/token.helper.js";

const setupPolicies = (policies) => {
    return (req, res, next) => {
        try {
            if(policies.includes("PUBLIC")) return next();

            const token = req?.cookies?.token
            const payload = verifyToken(token);

            if(!payload.role, !payload._id) return res.json401("Token no valido");

            const roles = {
                USER: policies.includes("USER"),
                ADMIN: policies.includes("ADMIN") 
            };

            if(!roles[payload.role]) return res.json403("No tienes permisos para acceder a este recurso");

            req.user = structuredClone(payload);
            next();
        } catch (error) {
            next(error);
        }
    }
}

export default setupPolicies;