const router = require('express').Router();
const productsController = require('../controllers/productsController');
const { authenticate } = require('../middleware/auth');
const { isAdmin }= require('../middleware/adminAuth')

router.get('/',authenticate, productsController.getAllProducts);

router.get('/:id',authenticate, productsController.getProductById);

router.post('/', authenticate, isAdmin, productsController.createProduct);

router.put('/:id', authenticate , isAdmin, productsController.updateProduct);

router.delete('/:id',authenticate, isAdmin, productsController.deleteProduct);

module.exports = router;