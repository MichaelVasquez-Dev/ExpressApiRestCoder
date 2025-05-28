import ProductDTO from "../dto/products.dto.js";
import productsRepository from "../repositories/products.repository.js";

class ProductsService {
    createOneService = async (product) => {
        const { title, description, category, image, price, stock, onsale, owner_id } = product;

        if( !title || !description ) throw new Error("Title and description are required");
        // const data = new ProductDTO({title, description, category, image, price, stock, onsale, owner_id});
        
        const productCreated = await productsRepository.createOneRepository(product);

        return productCreated;
    }

    readAllService = async () => {
        const products = await productsRepository.readAllRepository();
        return products;
    }

    readOneService = async (pid) => {
        const product = await productsRepository.readOneRepository(pid);
        return product;
    }

    updateService = async (pid, product) => {
        const productUpdated = await productsRepository.updateRepository(pid, product);
        return productUpdated;
    }

    deleteOneService = async (pid) => {
        const productDeleted = await productsRepository.deleteOneRepository(pid);
        return productDeleted;
    }
}

const productsService = new ProductsService();
export default productsService;