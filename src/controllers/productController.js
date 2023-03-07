const productService = require("../services/productService");
const { catchAsync } = require("../utils/error");

const getProducts = catchAsync(async (req, res) => {
  const userId = req.user;

  const products = await productService.getProducts(userId);

  res.status(200).json({ data: products });
});

const getProductMainCategories = catchAsync(async (req, res) => {
  const { mainCategoryName } = req.params;
  const { sort, firstDate, lastDate } = req.query;
  const userId = req.user;

  const productsMainCategories = await productService.getProductMainCategories(
    mainCategoryName,
    sort,
    firstDate,
    lastDate,
    userId
  );

  res.status(200).json({ data: productsMainCategories });
});

const getProductSubCategories = catchAsync(async (req, res) => {
  const { mainCategoryName, subCategoryName } = req.params;
  const { sort, firstDate, lastDate } = req.query;
  const userId = req.user;

  const getProductSubCategories = await productService.getProductSubCategories(
    mainCategoryName,
    subCategoryName,
    sort,
    firstDate,
    lastDate,
    userId
  );

  res.status(200).json({ data: getProductSubCategories });
});

const getDetailProducts = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const detailProduct = await productService.getDetailProducts(productId);

  res.status(200).json({ data: detailProduct });
});

const createProduct = catchAsync(async (req, res) => {
  const userId = req.user;
  const {
    name,
    firstDate,
    lastDate,
    price,
    description,
    participants,
    discountRate,
    scheduleTitle,
    scheduleEtc,
    classTypeId,
    subCategoryId,
    levelId,
    locationName,
    locationLatitude,
    locationLongitude,
    locationPlaceUrl,
    locationGroupName,
    schedules,
  } = req.body;

  const files = req.files;
  const thumbnailImageUrl = files[0].location;
  const productImagesUrl = [];
  for (let i = 1; i < files.length; i++) {
    productImagesUrl.push(files[i].location);
  }

  const productId = await productService.createProduct(
    userId,
    name,
    firstDate,
    lastDate,
    price,
    description,
    thumbnailImageUrl,
    participants,
    discountRate,
    scheduleTitle,
    scheduleEtc,
    classTypeId,
    subCategoryId,
    levelId,
    locationName,
    locationLatitude,
    locationLongitude,
    locationPlaceUrl,
    locationGroupName
  );

  await productService.addProductImages(productId, productImagesUrl);

  const schedulesArr = eval(schedules);
  await productService.addSchedule(productId, schedulesArr);

  return res.status(201).json({
    message: "PRODUCT_CREATED",
    productId: productId,
  });
});

const getProductsList = async (req, res) => {
  const userId = req.user;
  const productsList = await productService.getProductsList(userId);

  return res.status(201).json({ data: productsList });
};

const deleteProduct = catchAsync(async (req, res) => {
  const userId = req.user;
  const { productId } = req.params;

  await productService.deleteProduct(userId, productId);
  return res.status(204).send();
});

module.exports = {
  getProducts,
  getProductMainCategories,
  getProductSubCategories,
  getDetailProducts,
  createProduct,
  getProductsList,
  deleteProduct,
};
