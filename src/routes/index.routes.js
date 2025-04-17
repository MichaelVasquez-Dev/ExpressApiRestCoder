// import viewsRouter from "./view.routes.js";
// import apiRouter from "./api.routes.js";
import CustomRouter from "./custom.routes.js";
// import { Router } from "express";

class Routes extends CustomRouter {
    constructor() {
        super();
        this.init();
        console.log("Routes initialized");
    }

    init() {
        this.router.get("/api/asd", (req, res) => { 
            console.log("asd");
            res.json({asd: "asd"});    
        })
        // this.use("/", [], viewsRouter);
        // this.use("/api", [], apiRouter);
    }
}

const routes = new Routes();

console.log(routes.getRoutes());
export default routes.getRoutes();

// const routes = new Router();
// routes.get("/api/asd", (req, res) => { 
//     console.log("asd");
//     res.json({ asd: "asd" });   
// })
// export default routes;