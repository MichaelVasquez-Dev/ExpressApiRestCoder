import constants from "../../constants/constants.js";
import { createOne, deleteOne, pidParams, readAll, readOne, update } from "../../controllers/products.controller.js";
import CustomRouter from "../custom.routes.js";

class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.create("/", [constants.ROL_ADMIN], createOne);
    this.read("/", [constants.ROL_PUBLIC], readAll);
    this.read("/:pid", [constants.ROL_PUBLIC], readOne);
    this.update("/:pid", [constants.ROL_ADMIN], update);
    this.destroy("/:pid", [constants.ROL_ADMIN], deleteOne);
    this.router.param("pid", pidParams);
  }
}

const productsRouter = new ProductsRouter();

export default productsRouter.getRoutes();