const router = require('express').Router();

const productRouter = require('./productRouter');

router.use('/products', productRouter);

module.exports = router;