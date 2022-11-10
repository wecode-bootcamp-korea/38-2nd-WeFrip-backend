const userService = require('../services/userService')
const { catchAsync } = require('../utils/error')

const signIn = catchAsync(async(req, res) => {
  const { kakaoAccessToken } = req.body;
  
  const kakaoUserInfo = await userService.getKakaoUserInfo(kakaoAccessToken);
  await userService.storeKakaoUserInfo(kakaoUserInfo);

  const token = await userService.generateToken(kakaoUserInfo);

  return res.status(200).json({ 
    message : 'LOGIN_SUCCESS',
    accessToken : token
  });
});

const getUser = catchAsync(async(req, res) => {
  const userId = req.user;
  const userInfo = await userService.getUserById(userId);

  return res.status(200).json({
    message : 'SUCCESS',
    data :  userInfo
  });
});

const updateUser = catchAsync(async(req, res) => {
  const userId = req.user;
  const { hostName, email, phoneNumber, introduction } = req.body;

  await userService.updateUser(hostName, email, phoneNumber, introduction, userId);

  const userInfo = await userService.getUserById(userId);

  return res.status(201).json({
    message : 'SUCCESS',
    data : userInfo
  });
});

const updateProfileImage = catchAsync(async(req, res) => {
  const userId = req.user;
  const profileImageUrl = req.file.location;

  if (!profileImageUrl) {
    throw new CustomError({
      status: 401,
      response: {
        message: 'INVALID_FILE_PATH'
      }
    })
  }

  await userService.updateProfileImage(profileImageUrl, userId);
  const userInfo = await userService.getUserById(userId);

  return res.status(201).json({
    message : 'SUCCESS',
    data : userInfo
  });
});

module.exports = {
  signIn,
  getUser,
  updateUser,
  updateProfileImage
}