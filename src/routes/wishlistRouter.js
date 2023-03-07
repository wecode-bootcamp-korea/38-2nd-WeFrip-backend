const wishlistRouter = require("express").Router();
const wishlistController = require("../controllers/wishlistController");
const { loginRequired } = require("../utils/auth");

wishlistRouter.get("", loginRequired, wishlistController.getWishlist);
wishlistRouter.post("", loginRequired, wishlistController.addWishlist);

module.exports = wishlistRouter;
