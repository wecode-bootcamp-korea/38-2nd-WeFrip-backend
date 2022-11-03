const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/main', productController.getProducts);

module.exports = router;