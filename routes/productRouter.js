const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/main', productController.getProducts);
router.get('/category/:mainCategoryName', productController.getProductMainCategories)
router.get('/category/:mainCategoryName/:subCategoryName', productController.getProductSubCategories)

module.exports = router;