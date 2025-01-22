import Product from "../models/product_model.js";
import mongoose from 'mongoose';


export const getProducts =  async (req, res) =>{
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, message: products})
    }
    catch(error){
        console.log("error in fetching the details of products: ", error.message);
        res.status(400).json({success: false, message: "Server Error"});
    }
}

export const createProduct  = async (req, res) =>{
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message:"Please provide all fields"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(200).json({success: true, data:newProduct});
    }
    catch(error){
        console.error("Error in Create product: ", error.message);
        res.status(500).json({success: false, message:"Sever Error"});
    }
}


export const changePrice =  async (req, res) =>{
    const{ id } = req.params;

    try{
        const product = await Product.findById(id);

        if(!product){
            console.log("the product with given id was not found");
            return res.status(404).json({success: false, message: "Product not found"});
        }

        const productName = product.name;

        const updatedProduct = await Product.findByIdAndUpdate(id, {price:10000}, {new: true});
        console.log(updatedProduct);
        res.status(200).json({success: true, message: `Product ${productName} updated`});
    }
    catch (error){
        console.log("error in updating: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const changeImage  =  async (req, res) =>{
    const{ id } = req.params;

    try{
        const product = await Product.findById(id);

        if(!product){
            console.log("the product with given id was not found");
            return res.status(404).json({success: false, message: "Product not found"});
        }

        const productName = product.name;

        const updatedProduct = await Product.findByIdAndUpdate(id, {image:"example.com/image55"}, {new: true});
        console.log(updatedProduct);
        res.status(200).json({success: true, message: `Product ${productName} updated`});
    }
    catch (error){
        console.log("error in updating: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const changeProduct =  async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    }
    catch (error){
        res.status(500).json({success: false, message: "Server Error"});
    }
}


export const deleteProduct =async (req, res) => {
    const{ id } = req.params;
    // const {name} = req.body;
    // console.log(id);
    // console.log(name);

    // try{
    //     await Product.findByIdAndDelete(id);
    //     res.status(200).json({success: true, message: `Product ${name} deleted`})

    // }
    // catch (error){
    //     res.status(404).json({success: false, message: "Prouduct not found"})
    // }
    try{
        const product = await Product.findById(id);

        if(!product){
            console.log("the product with given id was not found");
            return res.status(404).json({success: false, message: "Product not found"});
        }

        const productName = product.name;

        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: `Product ${productName} deleted`});
    }
    catch (error){
        console.log("error in deleting: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}