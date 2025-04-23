const express = require('express');

const app = express();

app.use(express.json());

app.use('/products', require('./routes/productsRoute'));


app.listen(3000, () => console.log('Server is running on port 3000'))

////33.57
// https://www.youtube.com/watch?v=0pez9kbIoJQ&list=PLSYOk6lU2UL_1NWLD3JidUv2isHTfS0zP