import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
}, {
    timestamps: true    // createdAt, updatedAt
});

const Product = mongoose.model("Product", productSchema);       // mongoDB will automatically create a DB with the small and pluralised form of variable chosen which here will products

export default Product;             // why default???