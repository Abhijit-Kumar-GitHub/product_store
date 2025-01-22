import express from 'express';
import {getProducts, createProduct, changePrice, changeImage, changeProduct, deleteProduct} from '../controllers/product_controller.js';

const router = express.Router();

router.get('/', getProducts)

router.post('/',createProduct)

router.put('/changePrice/:id', changePrice)
router.put('/changeImage/:id', changeImage)
router.put('/changeProduct/:id', changeProduct);        // ye wala wo h jisme pass the body in api json and can change whatever we wanna in product

router.delete('/:id', deleteProduct)


export default router;