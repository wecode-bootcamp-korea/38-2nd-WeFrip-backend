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
    GROUP BY e.title
  `);
  return getEventProduct;
}

const mainCategoryFiltering = async (mainCategoryName, sort, firstDate, lastDate) => {
  const orderByObj = {
    desc : `(p.price * (100 - p.discount_rate * 0.01)) DESC`,
    asc : `(p.price * (100 - p.discount_rate * 0.01)) ASC`,
    latest : `p.created_at DESC`
  }
  const descAndAsc = orderByObj[sort];
  const firstDateQuery = firstDate ? `BETWEEN '${firstDate}'` : '';
  const lastDateQuery = firstDate ? `AND '${lastDate}'` : '';

  const filtering = await appDataSource.query(`
    SELECT
      lg.name AS locationGroupName,
      p.thumbnail_image_url AS thumbnailImageUrl,
      p.name,
      p.price,
      p.discount_rate AS discountRate
    FROM products AS p
    JOIN sub_categories AS sc ON p.sub_category_id = sc.id
    JOIN main_categories AS mc ON sc.main_category_id = mc.id
    JOIN location AS l ON p.location_id = l.id
    JOIN location_groups AS lg ON l.location_group_id = lg.id
    WHERE mc.name = ? AND DATE(first_date) AND (last_date) ${firstDateQuery} ${lastDateQuery}
    ORDER BY ${descAndAsc}  	
    LIMIT 12 OFFSET 0
  `, [mainCategoryName]);

  return filtering;
}

const getProductMainCategories = async (mainCategoryName) => {
  const productsMainCategories = await appDataSource.query(`
    SELECT
      mc.name AS mainCategoryName,
      (SELECT 
        JSON_ARRAYAGG(
          JSON_OBJECT('name', sc.name)
        ) 
      FROM sub_categories AS sc
      JOIN main_categories AS mc ON sc.main_category_id = mc.id
      WHERE mc.name = ?
      ) AS subCategories,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'locationGroupName', lg.name,
        'thumbnailImageUrl', p.thumbnail_image_url,
        'name', p.name,
        'price', p.price,
        'discountRate', p.discount_rate 
      )
    ) AS products
    FROM products AS p
    JOIN sub_categories AS sc ON p.sub_category_id = sc.id
    JOIN main_categories AS mc ON sc.main_category_id = mc.id
    JOIN location AS l ON p.location_id = l.id
    JOIN location_groups AS lg ON l.location_group_id = lg.id
    WHERE mc.name = ?
    LIMIT 12 OFFSET 0
  `, [mainCategoryName, mainCategoryName]);

  return productsMainCategories;
}

const subCategoryFiltering = async (mainCategoryName, subCategoryName, sort, firstDate, lastDate) => {
  const orderByobj = {
    desc : '(p.price * (100 - p.discount_rate * 0.01)) DESC',
    asc : '(p.price * (100 - p.discount_rate * 0.01)) ASC',
    latest : 'p.created_at DESC'
  }
  const descAndAsc = sort ? orderByobj[sort] : 'p.id';
  const firstDateQuery = firstDate ? `BETWEEN '${firstDate}'` : '';
  const lastDateQuery = firstDate ? `AND '${lastDate}'` : '';

  const filtering = await appDataSource.query(`
    SELECT
      lg.name AS locationGroupName,
      p.thumbnail_image_url AS thumbnailImageUrl,
      p.name,
      p.price,
      p.discount_rate AS discountRate
    FROM products AS p
    JOIN sub_categories AS sc ON p.sub_category_id = sc.id
    JOIN main_categories AS mc ON sc.main_category_id = mc.id
    JOIN location AS l ON p.location_id = l.id
    JOIN location_groups AS lg ON l.location_group_id = lg.id
    WHERE mc.name = ? AND sc.name = ?
    AND DATE(first_date) AND (last_date) ${firstDateQuery} ${lastDateQuery}
    ORDER BY ${descAndAsc}  	
    LIMIT 12 OFFSET 0
  `, [mainCategoryName, subCategoryName]);

  return filtering;
}

const getProductSubCategories = async (mainCategoryName, subCategoryName) => {
  const productsSubCategories = await appDataSource.query(`
    SELECT 
      mc.name AS mainCategoryName,
      sc.name AS subCategoryName,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'locationGroupName', lg.name,
          'thumbnailImageUrl', p.thumbnail_image_url,
          'name', p.name,
          'price', p.price,
          'discountRate', p.discount_rate 
        )
      ) AS products
    FROM products AS p
    JOIN sub_categories AS sc ON p.sub_category_id = sc.id
    JOIN main_categories AS mc ON sc.main_category_id = mc.id
    JOIN location AS l ON p.location_id = l.id
    JOIN location_groups AS lg ON l.location_group_id = lg.id
    WHERE mc.name = ? AND sc.name = ?
    GROUP BY mc.name, sc.name
    LIMIT 12 OFFSET 0
  `, [mainCategoryName, subCategoryName]);

  return productsSubCategories;
}

module.exports = {
  getProducts,
  mainCategoryFiltering,
  getProductMainCategories,
  subCategoryFiltering,
  getProductSubCategories
}