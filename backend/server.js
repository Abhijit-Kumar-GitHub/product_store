// const express = require('express');     // more modern version written in next line. for that we gotta change default "type": "module" from "commonjs" in package.json
import express from 'express'; 
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product_model.js';

dotenv.config();
 
const app = express();

// app.get('/', (req, res) =>{ 
//     res.send("Server is ready");
// })

app.use(express.json());            // middleware to allow us to use the JSON data in the req.  body

app.get('/api/products', async (req, res) =>{
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, message: products})
    }
    catch(error){
        console.log("error in fetching the details of products: ", error.message);
        res.status(400).json({success: false, message: "Server Error"});
    }
})

app.post('/api/products',async (req, res) =>{
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
})

app.put('/api/products/changePrice/:id', async (req, res) =>{
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
})

app.put('/api/products/changeImage/:id', async (req, res) =>{
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
})

// ye wala wo h jisme pass the body in api json and can change whatever we wanna in product
// app.put('/api/products/:id', async (req, res) => {
//     const {id} = req.params;

//     const product = req.body;

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({success: false, message: "Invalid Product Id"});
//     }

//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});]
//         res.status(200).json({success: true, data: updatedProduct});
//     }
//     catch (error){
//         res.status(500).json({success: false, message: "Server Error"});
//     }
// });

app.delete('/api/products/:id', async (req, res) => {
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
})

// console.log(process.env.MONGO_URI);  

app.listen(5500, () => {
    connectDB();
    console.log("the server started at http://localhost:5500 successfully and the DB is connected as well");
})

