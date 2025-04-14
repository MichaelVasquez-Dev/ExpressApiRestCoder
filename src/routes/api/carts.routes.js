import CustomRouter from "../custom.routes.js";
import { cidParams, createOne, deleteOne, readAll, readOne, updateOne } from "../../controllers/carts.controller.js";

class CartsRouter extends CustomRouter{
    constructor(){
        super()
        this.init()
    }

    init = () => {
        this.create("/", createOne)
        this.read("/", readAll)
        this.read("/:cid", readOne)
        this.update("/:cid", updateOne)
        this.update("/:cid/:state", updateOne)
        this.destroy("/:cid", deleteOne)
        this.router.param("cid", cidParams)
    }
}

const cartsRouter = new CartsRouter();

export default cartsRouter.getRoutes();