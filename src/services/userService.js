const jwt = require("jsonwebtoken");
const axios = require("axios");
const userDao = require("../models/userDao");

const getKakaoUserInfo = async (kakaoAccessToken) => {
  const result = await axios({
    method: "POST",
    url: "https://kapi.kakao.com/v2/user/me",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      Authorization: `Bearer ${kakaoAccessToken}`,
    },
  });

  const kakaoUserInfo = result.data;
  return kakaoUserInfo;
};

const storeKakaoUserInfo = async (kakaoUserInfo) => {
  const kakaoId = kakaoUserInfo.id;
  const { email, birthday, gender } = kakaoUserInfo.kakao_account;
  const { nickname } = kakaoUserInfo.kakao_account.profile;
  const profileImageUrl = kakaoUserInfo.kakao_account.profile.profile_image_url;

  const userId = await userDao.getUserIdByKakaoId(kakaoId);

  if (!userId) {
    await userDao.storeKakaoUserInfo(
      kakaoId,
      nickname,
      profileImageUrl,
      email,
      birthday,
      gender
    );
  }
};

const generateToken = async (kakaoUserInfo) => {
  const userId = await userDao.getUserIdByKakaoId(kakaoUserInfo.id);

  if (!userId) {
    const err = new Error("SPECIFIED_USER_DOES_NOT_EXIST");
    err.statusCode = 404;
    throw err;
  }

  return jwt.sign({ userId: userId.userId }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const getUserById = async (userId) => {
  return await userDao.getUserById(userId);
};

const updateUser = async (
  hostName,
  email,
  phoneNumber,
  introduction,
  userId
) => {
  const userInfo = await userDao.getUserById(userId);

  return await userDao.updateUser(
    hostName ? hostName : userInfo.hostName,
    email ? email : userInfo.email,
    phoneNumber ? phoneNumber : userInfo.phoneNumber,
    introduction ? introduction : userInfo.introduction,
    userId
  );
};

const updateProfileImage = async (profileImageUrl, userId) => {
  return await userDao.updateProfileImage(profileImageUrl, userId);
};

module.exports = {
  getKakaoUserInfo,
  storeKakaoUserInfo,
  generateToken,
  getUserById,
  updateUser,
  updateProfileImage,
};
