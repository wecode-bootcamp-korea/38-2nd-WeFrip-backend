const productService = require('../services/productService');
const { catchAsync } = require('../utils/error');

const getProducts = catchAsync(async (req, res) => {

  const products = await productService.getProducts();

  res.status(200).json({ data : products });
});

const getProductMainCategories = catchAsync(async (req, res) => {
  const { mainCategoryName } = req.params;
  const { sort, firstDate, lastDate } = req.query;
  const userId = req.user;

  const productsMainCategories = await productService.getProductMainCategories(mainCategoryName, sort, firstDate, lastDate, userId);

  res.status(200).json({ data : productsMainCategories });
});

const getProductSubCategories = catchAsync(async (req, res) => {
  const { mainCategoryName, subCategoryName } = req.params;
  const { sort, firstDate, lastDate } = req.query;
  const userId = req.user;

  const getProductSubCategories = await productService.getProductSubCategories(mainCategoryName, subCategoryName, sort, firstDate, lastDate, userId);

  res.status(200).json({ data : getProductSubCategories });

});

const getDetailProducts = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const detailProduct = await productService.getDetailProducts(productId);

  res.status(200).json({ data : detailProduct });
});

module.exports = {
  getProducts,
  getProductMainCategories,
  getProductSubCategories,
  getDetailProducts
}