const wishlistDao = require('../models/wishlistDao');

const getWishlist = async(userId) => {
  return await wishlistDao.getWishlist(userId);
};

const deleteWishlist = async(userId, productId) => {
  return await wishlistDao.deleteWishlist(userId, productId);
};

const addWishlist = async(userId, productId) => {
  const checkWishlist = await wishlistDao.checkWishlist(userId, productId)
  if(!checkWishlist.length){
    return await wishlistDao.addWishlist(userId, productId);
  } else{
    return await wishlistDao.deleteWishlist(userId, productId);
  }
};

module.exports = {
  getWishlist,
  deleteWishlist,
  addWishlist
}
