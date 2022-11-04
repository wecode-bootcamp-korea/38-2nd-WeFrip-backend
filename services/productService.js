const productDao = require('../models/productDao');

const getProducts = async () => {
  return await productDao.getProducts();
};

module.exports = {
  getProducts
}