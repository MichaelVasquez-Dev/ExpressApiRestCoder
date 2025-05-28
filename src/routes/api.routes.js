import { fork } from "child_process";
import authRouter from "./api/auth.routes.js";
import productsRoutes from "./api/products.routes.js";
import cartsRouter from "./api/carts.routes.js";
import CustomRouter from "./custom.routes.js";
import sumcb from "../helpers/sum.helper.js";
import sendEmailOfRegister from "../helpers/sendEmailOfRegister.helper.js";

const sum = (req, res) => {
    const result = sumcb();
    res.json200(result, "Sum finished")
}

const sumProcess = (req, res) => {
    const child = fork("./src/helpers/sumProcess.helper.js");
    child.send("start");
    child.on("message", (result) => res.json200(result, "Process finished"));
}

const testEmails = async (req, res) => {
    const email = process.env.EMAIL_TEST;
    const verifyCode = "123456";

    const x = await sendEmailOfRegister(email, verifyCode);
    res.json200({ message: "Email sent" }, "Email sent successfully");
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
        this.read("/testEmails", ["PUBLIC"], testEmails);
    }
}

const apiRouter = new ApiRouter();
export default apiRouter.getRoutes();