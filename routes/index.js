const router = require('express').Router();
const userRouter = require('./userRouter');

router.use('/users', userRouter);

const productRouter = require('./productRouter');

router.use('/products', productRouter);

module.exports = router;