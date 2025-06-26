const express = require('express');
const router = express.Router();
const { addOrder, deleteOrder, updateOrder, getOrder, getAllOrders } = require('../controllers/ordersController')
const { authenticate } = require('../middleware/auth');


router.post( '/add' ,authenticate , addOrder )

router.delete('/delete/:id', authenticate, deleteOrder )

router.put('/update/:id',authenticate, updateOrder)

router.get('/:id', authenticate, getOrder);

router.get('/', authenticate, getAllOrders);

module.exports = router;