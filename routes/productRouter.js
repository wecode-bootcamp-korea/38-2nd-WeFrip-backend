const router = require('express').Router();
const productController = require('../controllers/productController');
const { optionalLogin } = require('../utils/auth');


router.get('/main', productController.getProducts);
router.get('/category/:mainCategoryName', optionalLogin, productController.getProductMainCategories)
router.get('/category/:mainCategoryName/:subCategoryName', optionalLogin, productController.getProductSubCategories)

module.exports = router;