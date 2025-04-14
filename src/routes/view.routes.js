import { login, register } from "../controllers/auth.controller.js";
import CustomRouter from "./custom.routes.js";

class ViewsRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init(){
        this.read("/login", login);
        this.read("/register", register);
    }
}

const viewsRouter = new ViewsRouter();

export default viewsRouter.getRoutes();