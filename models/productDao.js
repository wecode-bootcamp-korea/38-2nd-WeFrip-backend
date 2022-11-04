const appDataSource = require('./dataSource');

const getProducts = async () => {
  const getEventProduct = await appDataSource.query(`
    SELECT 
      e.title AS eventTitle,
      JSON_ARRAYAGG(JSON_OBJECT(
        'productId', p.id,
        'name', p.name,
        'thumbnailImageUrl', p.thumbnail_image_url,
        'price', p.price,
        'discountRate', p.discount_rate,
        'locationGroupName', lg.name
      )) AS products
    FROM products AS p
    JOIN location AS l ON p.location_id = l.id
    JOIN location_groups AS lg ON l.location_group_id = lg.id
    JOIN events AS e ON e.product_id = p.id
    GROUP BY e.title;
  `);
  return getEventProduct;
}

module.exports = {
  getProducts
}