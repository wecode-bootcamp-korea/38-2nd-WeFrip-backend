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

const createProduct = async(userId, name, firstDate, lastDate, price, description, thumbnailImageUrl, participants, discountRate, scheduleTitle, scheduleEtc, classTypeId, subCategoryId, levelId, locationName, locationLatitude, locationLongitude, locationPlaceUrl, locationGroupName) => {

  const productId = await productDao.createProduct(userId, name, firstDate, lastDate, price, description, thumbnailImageUrl, participants, discountRate, scheduleTitle, scheduleEtc, classTypeId, subCategoryId, levelId, locationName, locationLatitude, locationLongitude, locationPlaceUrl, locationGroupName)

  return productId;
}

const addProductImages = async(productId, productImagesUrl) => {
  
  for (let i = 0; i < productImagesUrl.length; i++) {
    await productDao.addProductImages(productId, productImagesUrl[i]);
  }

}

const addSchedule = async(productId, schedulesArr) => {

  for (let i = 0; i < schedulesArr.length; i++) {
    await productDao.addSchedule(productId, schedulesArr[i]);
  }

}

const getProductsList = async(userId) => {
  return await productDao.getProductsList(userId);
};

const deleteProduct = async(userId, productId) => {

  return await productDao.deleteProduct(userId, productId);
};

module.exports = {
  getProducts,
  getProductMainCategories,
  getProductSubCategories,
  getDetailProducts,
  createProduct,
  addProductImages,
  addSchedule,
  getProductsList,
  deleteProduct
}