const productService = require('../services/productService');
const { catchAsync } = require('../utils/error');

const getProducts = catchAsync(async (req, res) => {

  const products = await productService.getProducts();

  res.status(200).json({ data : products });
});

module.exports = {
  getProducts
}