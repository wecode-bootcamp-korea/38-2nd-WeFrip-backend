const productDao = require('../models/productDao');

const getProducts = async () => {
  return await productDao.getProducts();
}

const getProductMainCategories = async (mainCategoryName, sort, firstDate, lastDate) => {  
  if (sort) {
    return await productDao.mainCategoryFiltering(mainCategoryName, sort, firstDate, lastDate);
  } else if(firstDate || lastDate) {
    return await productDao.mainCategoryFiltering(mainCategoryName, sort, firstDate, lastDate);
  } else {
    return await productDao.getProductMainCategories(mainCategoryName);
  }
}

const getProductSubCategories = async (mainCategoryName, subCategoryName, sort, firstDate, lastDate) => {
  if (sort) {
    return await productDao.subCategoryFiltering(mainCategoryName, subCategoryName, sort, firstDate, lastDate);
  } else if (firstDate || lastDate) {
    return await productDao.subCategoryFiltering(mainCategoryName, subCategoryName, sort, firstDate, lastDate);
  } else {
    return await productDao.getProductSubCategories(mainCategoryName, subCategoryName);
  }
}

const getDetailProducts = async(productId) => {
  return await productDao.getDetailProducts(productId);
}

module.exports = {
  getProducts,
  getProductMainCategories,
  getProductSubCategories,
  getDetailProducts
}