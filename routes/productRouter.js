const router = require('express').Router();
const productController = require('../controllers/productController');
const { optionalLogin } = require('../utils/auth');
const { loginRequired } = require('../utils/auth');
const { imageUploader } = require('../utils/imageUploader');

router.get('/main', optionalLogin, productController.getProducts);

router.get('/category/:mainCategoryName', productController.getProductMainCategories);

router.get('/category/:mainCategoryName/:subCategoryName', productController.getProductSubCategories);

router.get('/:productId', productController.getDetailProducts);

router.post('', loginRequired, imageUploader.array('images', 5), productController.createProduct);

router.get('/list/all', loginRequired, productController.getProductsList);

router.delete('/list/:productId', loginRequired, productController.deleteProduct);

module.exports = router;