const productDao = require('../models/productDao');

const getProducts = async (userId) => {
  return await productDao.getProducts(userId);
}

const getProductMainCategories = async (mainCategoryName, sort, firstDate, lastDate, userId) => {  
  if (sort) {
    return await productDao.mainCategoryFiltering(mainCategoryName, sort, firstDate, lastDate, userId);
  } else if(firstDate || lastDate) {
    return await productDao.mainCategoryFiltering(mainCategoryName, sort, firstDate, lastDate, userId);
  } else {
    return await productDao.getProductMainCategories(mainCategoryName, userId);
  }
}

const getProductSubCategories = async (mainCategoryName, subCategoryName, sort, firstDate, lastDate, userId) => {
  if (sort) {
    return await productDao.subCategoryFiltering(mainCategoryName, subCategoryName, sort, firstDate, lastDate, userId);
  } else if (firstDate || lastDate) {
    return await productDao.subCategoryFiltering(mainCategoryName, subCategoryName, sort, firstDate, lastDate, userId);
  } else {
    return await productDao.getProductSubCategories(mainCategoryName, subCategoryName, userId);
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