import authRouter from "./api/auth.routes.js";
import productsRoutes from "./api/products.routes.js";
import cartsRouter from "./api/carts.routes.js";
import CustomRouter from "./custom.routes.js";

class ApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.use("/auth", authRouter);
        this.use("/products", productsRoutes);
        this.use("/carts", cartsRouter);
    }
}

const apiRouter = new ApiRouter();

export default apiRouter.getRoutes();