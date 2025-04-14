import viewsRouter from "./view.routes.js";
import apiRouter from "./api.routes.js";
import CustomRouter from "./custom.routes.js";

class Routes extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init() {
        this.use("/", viewsRouter);
        this.use("/api", apiRouter);
    }
}

const routes = new Routes();
export default routes.getRoutes();