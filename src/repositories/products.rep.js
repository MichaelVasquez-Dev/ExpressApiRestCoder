import { productsManager } from "../data/dao.factory.js";


const createOneRepository = async (data) => {
    const productCreated = await productsManager.create(data);
    return productCreated;
}

const readAllRepository = async () => {
    const products = await productsManager.readAll();
    return products;
}

const readOneRepository = async () => {
    const product = await productsManager.readById(pid);
    if (!product) throw new Error("Product not found");
    return product;
}

const updateRepository = async () => {
    const productUpdated = await productsManager.updateById(pid, product);
    if (!productUpdated) throw new Error("Product not found");
    return productUpdated;
}

const deleteOneRepository = async () => {
    const productDeleted = await productsManager.deleteById(pid);
    if (!productDeleted) throw new Error("Product not found");
    return productDeleted;
}


export { createOneRepository, readAllRepository, readOneRepository, updateRepository, deleteOneRepository };