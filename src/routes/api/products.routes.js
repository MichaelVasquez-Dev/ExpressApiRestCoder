import { createOne, deleteOne, pidParams, readAll, readOne, update } from "../../controllers/products.controller.js";
import passportCB from "../../middlawares/passportCB.mid.js";
import CustomRouter from "../custom.routes.js";

class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.create("/", ["ADMIN"], createOne);
    this.read("/", ["PUBLIC"], readAll);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], deleteOne);
    this.router.param("pid", pidParams);
  }
}

const productsRouter = new ProductsRouter();

export default productsRouter.getRoutes();