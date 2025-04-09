const express = require('express');
const crypto = require('crypto');

const app = express();

app.use(express.json());

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

app.get('/', (req, res) => {
  res.send('Testing...');
});

app.get('/products', (req, res) => {
    res.status(200).json(products);

})

app.post('/products', (req, res) => {
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
})

app.get('/products/:id', (req, res) => {
    const product = products.find((product) => product.id === req.params.id);    

    if (!product){
        return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product);

})

app.listen(3000, () => console.log('Server is running on port 3000'))

////33.57
// https://www.youtube.com/watch?v=0pez9kbIoJQ&list=PLSYOk6lU2UL_1NWLD3JidUv2isHTfS0zP