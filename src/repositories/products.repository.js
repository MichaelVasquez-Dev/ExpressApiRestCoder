import { productsManager } from "../dao/factory.dao.js";
import ProductDTO from "../dto/products.dto.js";

class ProductsReposiroty{
    createOneRepository = async (data) => {
        const product = ProductDTO(data);
        const productCreated = await productsManager.create(product);
        return productCreated;
    }

    readAllRepository = async () => {
        const products = await productsManager.readAll();
        return products;
    }

    readOneRepository = async () => {
        const product = await productsManager.readById(pid);
        if (!product) throw new Error("Product not found");
        return product;
    }

    updateRepository = async () => {
        const productUpdated = await productsManager.updateById(pid, product);
        if (!productUpdated) throw new Error("Product not found");
        return productUpdated;
    }

    deleteOneRepository = async () => {
        const productDeleted = await productsManager.deleteById(pid);
        if (!productDeleted) throw new Error("Product not found");
        return productDeleted;
    }
}

const productsRepository = new ProductsReposiroty();
export default productsRepository;