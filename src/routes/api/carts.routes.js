import CustomRouter from "../custom.routes.js";
import { cidParams, createOne, deleteOne, readAll, readOne, updateOne } from "../../controllers/carts.controller.js";
import constants from "../../constants/constants.js";

class CartsRouter extends CustomRouter{
    constructor(){
        super()
        this.init()
    }

    init = () => {
        this.create("/", [constants.ROL_USER], createOne)
        this.read("/", [constants.ROL_USER], readAll)
        this.read("/:cid", [constants.ROL_USER], readOne)
        this.update("/:cid", [constants.ROL_USER], updateOne)
        this.update("/:cid/:state", [constants.ROL_USER], updateOne)
        this.destroy("/:cid", [constants.ROL_USER], deleteOne)
        this.router.param("cid", cidParams)
    }
}

const cartsRouter = new CartsRouter();

export default cartsRouter.getRoutes();