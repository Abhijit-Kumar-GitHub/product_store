// const express = require('express');     // more modern version written in next line. for that we gotta change default "type": "module" from "commonjs" in package.json
import express from 'express'; 
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product_route.js'


dotenv.config();
 
const app = express();

const PORT = process.env.PORT || 5500; 

// app.get('/', (req, res) =>{ 
//     res.send("Server is ready");
// })

app.use(express.json());            // middleware to allow us to use the JSON data in the req.  body

app.use("/api/products", productRoutes);

// console.log(process.env.MONGO_URI);  

app.listen(PORT, () => {
    connectDB();
    console.log("the server started at http://localhost:"+PORT+" successfully and the DB is connected as well");
})

