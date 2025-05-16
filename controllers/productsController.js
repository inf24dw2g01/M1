const router = require('express').Router();
const crypto = require('crypto');
const Product = require('../models/Product');


exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.findAll();
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({ error : 'Failed to fetch products', details : error.message })
    }
}

exports.createProduct = async (req, res) => {
    const { name, description, price } = req.body;

    // Validate required fields
    if (!name || typeof name !== 'string') {
        return res.status(422).json({
            message: 'Invalid or missing "name". It must be a non-empty string.',
        });
    }

    if (price === undefined || typeof price !== 'number' || price <= 0) {
        return res.status(422).json({
            message: 'Invalid or missing "price". It must be a positive number.',
        });
    }

    try {
        const id = crypto.randomUUID();

        const newProduct = await Product.create({
            name,
            description: description || '', // Default to empty string if not provided
            price,
            id,
        });

        res.status(201).json({
            message: 'Product added successfully',
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error while adding product',
            details: error.message,
        });
    }
};

exports.getProductById = async (req, res) => {

    try {
        const product = await Product.findOne({ where : { id: req.params.id } }) 

        if (!product){
            return res.status(404).json({ message: 'Product not found' })
        }
    
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({error : error.message});
    }

}

exports.updateProduct = async (req, res) => {

    try{
        const product = await Product.findOne({ where: { id: req.params.id } });

        if (!product){
            return res.status(404).json({ message: 'Product not found' })
        }
    
        const { name, description, price } = req.body;
        if (name) {
            product.name = name;
        }
    
        if (description) {
            product.description = description;
        }
    
        if (price) {
            if (isNaN(price) || price <= 0) {
                return res.status(400).json({ message: 'Invalid price value' });
            }
            product.price = price;
        }
    
        await product.save();
    
        res.status(200).json({message: 'Product updated successfully'});
    }
    catch(error){
        res.status(500).json({error: 'Error updating products' , details : error.message})
    }
   
}

exports.deleteProduct = async (req, res) => {

    try {
        const deletedCount = await Product.destroy({ where: { id: req.params.id } });
   
        if (deletedCount === 0){
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json({message: 'Product deleted successfully'});

    }
    catch(error){
        res.status(500).json({error: 'Unable to delete products'})
    }
 
};
