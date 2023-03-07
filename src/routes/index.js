const router = require('express').Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const wishlistRouter = require('./wishlistRouter');

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/wishlists', wishlistRouter);

module.exports = router;