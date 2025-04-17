import { verifyToken } from "../helpers/token.helper.js";

const setupPolicies = (policies) => {
    return (req, res, next) => {
        try {
            if(policies.inclides("PUBLIC")) return next();

            const token = req?.cookies?.token
            const { role, _id } = verifyToken(token);
            if(!role, !_id) return res.json401("Token no valido");

            const roles = {
                USER: policies.inclides("USER"),
                ADMIN: policies.inclides("ADMIN") 
            };

            if(!roles[role]) return res.json403("No tienes permisos para acceder a este recurso");

            req.user = { role, _id };
            next();
        } catch (error) {
            next(error);
        }
    }
}

export default setupPolicies;