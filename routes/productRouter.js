const router = require('express').Router();
const productController = require('../controllers/productController');
const { optionalLogin } = require('../utils/auth');

router.get('/main', optionalLogin, productController.getProducts);
router.get('/category/:mainCategoryName', productController.getProductMainCategories);
router.get('/category/:mainCategoryName/:subCategoryName', productController.getProductSubCategories);

module.exports = router;