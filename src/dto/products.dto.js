import crypto from 'crypto';
const { PERSISTENCE } = process.env;

class ProductDTO {

    constructor(product) {

        if( PERSISTENCE !== 'mongo' ) {
            this.id = crypto.randomBytes(12).toString('hex');
            this.createdAt = new Date().toISOString();
            this.updatedAt = new Date().toISOString();
        }

        this.title = product.title
        this.description = product.description
        this.category = product.category || "Laptop"
        this.image = product.image || "https://i.blogs.es/966d16/portada/1366_2000.png"
        this.price = product.price || 10
        this.stock = product.stock || 0
        this.onsale = product.onsale || false
        this.owner_id = product.owner_id 
        this.active = product.active || true
    }

} 


export default ProductDTO;