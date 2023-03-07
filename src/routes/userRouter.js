const router = require("express").Router();
const userController = require("../controllers/userController");
const { loginRequired } = require("../utils/auth");
const { imageUploader } = require("../utils/imageUploader");

router.post("/signin", userController.signIn);
router.get("", loginRequired, userController.getUser);
router.patch("", loginRequired, userController.updateUser);
router.patch(
  "/profileImage",
  loginRequired,
  imageUploader.single("image"),
  userController.updateProfileImage
);

module.exports = router;
