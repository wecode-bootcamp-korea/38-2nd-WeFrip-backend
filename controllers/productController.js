const productService = require('../services/productService');
const { catchAsync } = require('../utils/error');

const getProducts = catchAsync(async (req, res) => {

  const products = await productService.getProducts();

  res.status(200).json({ data : products });
});

const getProductMainCategories = catchAsync(async (req, res) => {
  const { mainCategoryName } = req.params;
  const { sort, firstDate, lastDate } = req.query;

  const productsMainCategories = await productService.getProductMainCategories(mainCategoryName, sort, firstDate, lastDate);

  res.status(200).json({ data : productsMainCategories });
});

const getProductSubCategories = catchAsync(async (req, res) => {
  const { mainCategoryName, subCategoryName } = req.params;
  const { sort, firstDate, lastDate } = req.query;

  const getProductSubCategories = await productService.getProductSubCategories(mainCategoryName, subCategoryName, sort, firstDate, lastDate);

  res.status(200).json({ data : getProductSubCategories });
});

module.exports = {
  getProducts,
  getProductMainCategories,
  getProductSubCategories
}