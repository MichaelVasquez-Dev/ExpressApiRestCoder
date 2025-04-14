import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
        index: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    state: {
        type: String,
        enum: ["reserved", "paid", "delivered", "cancelled"],
        default: "reserved",
        index: true,
    }
}, { timestamps: true });

cartSchema.pre("find", function () {
    this.populate("product_id", "title price stock description image_url category_id")
        .populate("user_id", "first_name last_name email phone address")
});

const Cart = model("carts", cartSchema);
export default Cart;