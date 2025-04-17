import { fork } from "child_process";
import authRouter from "./api/auth.routes.js";
import productsRoutes from "./api/products.routes.js";
import cartsRouter from "./api/carts.routes.js";
import CustomRouter from "./custom.routes.js";
import sumcb from "../helpers/sum.helper.js";

const sum = (req, res) => {
    const result = sumcb();
    res.json200(result, "Sum finished")
}

const sumProcess = (req, res) => {
    const child = fork("./src/helpers/sumProcess.helper.js");
    child.send("start");
    child.on("message", (result) => res.json200(result, "Process finished"));
}

class ApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.use("/auth", authRouter);
        this.use("/products", productsRoutes);
        this.use("/carts", cartsRouter);
        this.read("/sum", ["PUBLIC"], sum)
        this.read("/sumProc", ["PUBLIC"], sumProcess)
    }
}

const apiRouter = new ApiRouter();
export default apiRouter.getRoutes();