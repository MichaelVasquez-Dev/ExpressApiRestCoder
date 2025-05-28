import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN", "PREMIUM"],
        default: "USER",
    }, 
    avatar: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    },
    isGoogleUser: {
        type: Boolean,
        default: false,
    },
    isVerify:{
        type: Boolean,
        default: false,
    },
    verifyCode:{
        type: String,
        default: "",
    },
    active: {
        type: Boolean,
        default: true,
    },
},{
    timestamps: true,
});

const User = model("User", userSchema);

export default User;