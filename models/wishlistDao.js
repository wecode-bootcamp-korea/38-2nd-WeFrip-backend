const appDataSource = require('./dataSource');

const getWishlist = async (userId) => {
  const getWishlist = await appDataSource.query(`
    SELECT
      u.id AS userId,
      p.id AS productId,
      p.price AS price,
      p.name AS name,
      p.thumbnail_image_url AS thumbnailImageUrl,
      p.discount_rate AS discountRate,
      lg.name AS locationGroupName
    FROM wishlists AS w
    INNER JOIN users AS u ON w.user_id = u.id
    INNER JOIN products AS p ON w.product_id = p.id
    INNER JOIN location AS l ON p.location_id = l.id
    INNER JOIN location_groups AS lg ON l.location_group_id = lg.id
    WHERE w.user_id = ?
  `, [userId]
  );
  return getWishlist;
};

const deleteWishlist = async (userId, productId) => {
  const deleteWishlist = await appDataSource.query(`
    DELETE
    FROM wishlists
    WHERE user_id = ? AND product_id = ?
  `, [userId, productId]
  );
  return deleteWishlist;
};

const addWishlist = async (userId, productId) => {
  const addWishlist = await appDataSource.query(`
    INSERT INTO wishlists(
      user_id,
      product_id
    )
    VALUES (?, ?);
    `, [userId, productId]
  );
  return addWishlist.insertId;
};

const checkWishlist = async (userId, productId) => {
  const checkWishlist = await appDataSource.query(`
    SELECT 
      id
    FROM wishlists
    WHERE user_id=? and product_id=? 
    `, [userId, productId]
  );
  return checkWishlist;
};

module.exports = {
  getWishlist,
  deleteWishlist,
  addWishlist,
  checkWishlist
}