import ProductDTO from "../dto/products.dto.js";
import { createOneRepository, deleteOneRepository, readAllRepository, readOneRepository, updateRepository } from "../repositories/products.rep.js";

const createOneService = async (product) => {
    const { title, description, category, image, price, stock, onsale, owner_id } = product;

    if( !title || !description ) throw new Error("Title and description are required");
    const data = new ProductDTO({title, description, category, image, price, stock, onsale, owner_id});
    
    const productCreated = await createOneRepository(data);

    return productCreated;
}

const readAllService = async () => {
    console.log("readAllService");
    const products = await readAllRepository();
    return products;
}

const readOneService = async (pid) => {
    const product = await readOneRepository(pid);
    return product;
}

const updateService = async (pid, product) => {
    const productUpdated = await updateRepository(pid, product);
    return productUpdated;
}

const deleteOneService = async (pid) => {
    const productDeleted = await deleteOneRepository(pid);
    return productDeleted;
}



export { createOneService, readAllService, readOneService, updateService, deleteOneService };