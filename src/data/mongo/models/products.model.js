import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "Laptop",
        enum: ["Laptop", "Smartphone", "Tablet", "Monitor", "Printer"],
        index: true,
    },
    image: {
        type: String,
        default: "https://i.blogs.es/966d16/portada/1366_2000.png",
    },
    price: {
        type: Number,
        default: 10,
        min: 0,
    },
    stock: {
        type: Number,
        default: 0,
        min: 0,
    },
    onsale: {
        type: Boolean,
        default: false,
    },
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

productSchema.pre("find", function () {
    this.populate("owner_id", "first_name last_name email phone address")
});

const Product = model("products", productSchema);

export default Product;