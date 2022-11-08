const appDataSource = require('./dataSource');

const getUserIdByKakaoId = async(kakaoId) => {
  const [ result ] = await appDataSource.query(`
    SELECT
      id AS userId
    FROM users
    WHERE kakao_id = ?;`, 
    [ kakaoId ]
  );
  return result
}

const storeKakaoUserInfo = async(kakaoId, nickname, profileImageUrl, email, birthday, gender) => {

  let genderId = 0;
  const GENDER = Object.freeze({
    male : 1,
    female : 2,
    other : 3
  })
  genderId = GENDER[gender]

  return await appDataSource.query(`
    INSERT INTO users (
      kakao_id,
      nickname,
      profile_image_url,
      email,
      birthday,
      gender_id
    ) VALUES (?, ?, ?, ?, ?, ?);`, 
    [ kakaoId, nickname, profileImageUrl, email, birthday, genderId ]
  );
}

const getUserById = async(userId) => {
  const [ result ] = await appDataSource.query(`
    SELECT
      u.host_name AS hostName,
      u.nickname,
      u.profile_image_url AS profileImageUrl,
      u.email,
      u.kakao_id AS kakaoId,
      u.phone_number AS phoneNumber,
      u.address,
      u.birthday,
      u.point,
      u.introduction,
      g.type AS gender
    FROM users AS u
    JOIN gender AS g ON u.gender_id = g.id
    WHERE u.id=?`, 
    [userId]
  );
  return result;
}

const updateUser = async(hostName, email, phoneNumber, introduction, userId) => {
  
  const updatedRows = (await appDataSource.query(`
    UPDATE users
    SET
      host_name = ?,
      email = ?,
      phone_number = ?,
      introduction = ?
    WHERE id = ?;`, 
    [ hostName, email, phoneNumber, introduction, userId ]
  )).affectedRows

  if (updatedRows !== 1) throw new Error(UNEXPECTED_NUMBER_OF_RECORDS_UPDATED)
}

const updateProfileImage = async(profileImageUrl, userId) => {
  
  const updatedRows = (await appDataSource.query(`
    UPDATE users
    SET
      profile_image_url = ?
    WHERE id = ?;`, 
    [ profileImageUrl, userId ]
  )).affectedRows

  if (updatedRows !== 1) throw new Error(UNEXPECTED_NUMBER_OF_RECORDS_UPDATED)
}

module.exports = {
  getUserIdByKakaoId,
  storeKakaoUserInfo,
  getUserById,
  updateUser,
  updateProfileImage,
}
