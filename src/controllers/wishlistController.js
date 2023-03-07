const  wishlistService  = require('../services/wishlistService');
const { catchAsync } = require('../utils/error');

const getWishlist = catchAsync(async (req, res) => {
  const userId = req.user;

  const wishlistlist = await wishlistService.getWishlist(userId);
  res.status(200).json({ data : wishlistlist });
});

const deleteWishlist = catchAsync(async (req, res) => {
  const userId = req.user;
  const { productId } = req.body;

  await wishlistService.deleteWishlist(userId, productId);
  res.status(204).json();
});

const addWishlist = catchAsync(async (req, res) => {
  const userId = req.user;
  const { productId } = req.body;

  const wishlistId = await wishlistService.addWishlist(userId, productId);
  res.status(201).json({ 
    massage : 'success',
    wishlistId : wishlistId
  })
});

module.exports = {
  getWishlist,
  deleteWishlist,
  addWishlist
};