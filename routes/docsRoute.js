const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../controllers/docsController');

router.use('/',swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = router;