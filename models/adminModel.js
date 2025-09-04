import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_at: { 
        type: Date, default: Date.now },
}, { timestamps: true });

const adminModel = mongoose.model("users", userSchema);

export default adminModel;