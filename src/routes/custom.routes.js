import { Router } from "express";
import setupResponses from "../middlawares/setupResponses.mid.js";
import setupPolicies from "../middlawares/setupPolicies.mid.js";

class CustomRouter {
    constructor() {
        this.router = Router();
        this.router.use(setupResponses);
    }

    getRoutes = () => this.router;

    applyMiddleware = (callbacks) => callbacks.map(callback => async(req, res, next) => {
        try {
            await callback(req, res, next);
        } catch (error) {
            next(error);
        }
    });

    create = (path, policies, ...callbacks) => this.router.post(path, setupPolicies(policies), this.applyMiddleware(callbacks));
    read = (path, policies, ...callbacks) => this.router.get(path, setupPolicies(policies), this.applyMiddleware(callbacks));
    update = (path, policies, ...callbacks) => this.router.put(path, setupPolicies(policies), this.applyMiddleware(callbacks));
    destroy = (path, policies, ...callbacks) => this.router.delete(path, setupPolicies(policies), this.applyMiddleware(callbacks));
    use = (path, ...callbacks) => this.router.use(path, this.applyMiddleware(callbacks));
}

export default CustomRouter; 