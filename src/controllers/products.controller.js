import { Types } from "mongoose";
import { productsManager } from "../data/mongo/manager.mongo.js";

const createOne = async (req, res) => {
    const {title, description, category, image, price, stock, onsale } = req.body;

    if( !title || !description ) {
        const error = new Error("Missing required fields");
        error.status = 400;
        return next(error);
    }

    const product = await productsManager.create({
        title,
        description,
        category,
        image,
        price,
        stock,
        onsale,
        owner_id: req.user._id
    });

    res.json201( product, "Product created successfully" );
};

const readAll = async (req, res) => {
    const products = await productsManager.readAll();
    res.json200( products, "Products retrieved successfully" );
};

const readOne = async (req, res) => {
    const { id } = req.params;
    const product = await productsManager.readById(id);
    res.json200( product, "Product retrieved successfully" );
};

const update = async (req, res) => {
    const { pid } = req.params;
    const { title, description, category, image, price, stock, onsale } = req.body;
    const product = await productsManager.updateById(pid, {
        title,
        description,
        category,
        image,
        price,
        stock,
        onsale
    });

    res.json200( product, "Product updated successfully" );
};

const deleteOne = async (req, res) => {
    const { pid } = req.params;
    await productsManager.deleteById(pid);
    res.json200( null, "Product deleted successfully" );
};

const pidParams = (req, res, next, id) => {
    const isObjectId = Types.ObjectId.isValid(id);
    if (!isObjectId) {
        res.json400("Invalid ID format");
    }
    next();
  };


export { createOne, readAll, readOne, update, deleteOne, pidParams };
