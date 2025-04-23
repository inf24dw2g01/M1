const router = require('express').Router();
const crypto = require('crypto');

const products = [
    {
        "id": "9b345ece-4dbc-44b6-ba1f-9bd8be37aae0",
        "name": "Laptop",
        "price": 1000,
        "quantity": 10,
        "active": true
    },
    {
        "id": "9b345ece-4dbc-44b6-ba1f-9bd8be37aae1",
        "name": "Phone",
        "price": 500,
        "quantity": 20,
        "active": true
    },
    {
        "id": "9b345ece-4dbc-44b6-ba1f-9bd8be37aae6",
        "name": "Tablet",
        "price": 300,
        "quantity": 15,
        "active": false
    },
    {
        "id": "9b345ece-4dbc-44b6-ba1f-9bd8be37aae3",
        "name": "Mango",
        "price": 50,
        "quantity": 1000,
        "active": false
    }
];

exports.getAllProducts = (req, res) => {
    res.status(200).json(products);
}

exports.createProduct = (req, res) => {
    const { name, price, quantity, active } = req.body;


    if (!name){
        return res.status(422).json({
            message: 'Name is required',
        });
    }

    const id = crypto.randomUUID();

    products.push({
        id,
        name,
        price,
        quantity,
        active,
    });

    res.status(201).json({
        message: 'Product added successfully',id
    });
}

exports.getProductById = (req, res) => {
    const product = products.find((product) => product.id === req.params.id);    

    if (!product){
        return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product);

}

exports.updateProduct = (req, res) => {
    const product = products.find((product) => product.id === req.params.id);    

    if (!product){
        return res.status(404).json({ message: 'Product not found' })
    }

    const { name, price, quantity, active } = req.body;

    if (name) {
        product.name = name;
    }

    if (price) {
        product.price = price;
    }

    
    if (quantity) {
        product.quantity = quantity;
    }

    if ('active' in req.body) {
        product.active = active;
    }

    res.status(200).json({message: 'Product updated successfully'});
}

exports.deleteProduct = (req, res) => {
    const productIndex = products.findIndex((product) => product.id === req.params.id);    
    
    if (productIndex === -1){
        return res.status(404).json({ message: 'Product not found' })
    }
    
    products.splice(productIndex, 1);
    
    res.status(200).json({message: 'Product deleted successfully'});
}
