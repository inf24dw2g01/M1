const express = require('express');

const app = express();


app.use('/api-docs',require('./routes/docsRoute'))

app.use(express.json());

app.use('/products', require('./routes/productsRoute'));

app.listen(3000, () => console.log('Server is running on port 3000'))
