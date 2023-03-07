const appDataSource = require('./dataSource');

const getProducts = async (userId) => {
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
        )
      ) AS products,
    (
    SELECT 
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'productId', w.product_id
        )
      )       
    FROM wishlists AS w
    JOIN users AS u ON w.user_id = u.id
    JOIN products AS p ON w.product_id = p.id
    WHERE u.id = ?
    ) AS wishlists
    FROM products AS p
    JOIN location AS l ON p.location_id = l.id
    JOIN location_groups AS lg ON l.location_group_id = lg.id
    JOIN events AS e ON e.product_id = p.id
    GROUP BY e.title
  `, [userId]);
  return getEventProduct;
}

const mainCategoryFiltering = async (mainCategoryName, sort, firstDate, lastDate, userId) => {
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
      p.discount_rate AS discountRate,
      (
        SELECT 
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'productId', w.product_id
            )
          )       
        FROM wishlists AS w
        JOIN users AS u ON w.user_id = u.id
        JOIN products AS p ON w.product_id = p.id
        WHERE u.id = ?
        ) AS wishlists
    FROM products AS p
    JOIN sub_categories AS sc ON p.sub_category_id = sc.id
    JOIN main_categories AS mc ON sc.main_category_id = mc.id
    JOIN location AS l ON p.location_id = l.id
    JOIN location_groups AS lg ON l.location_group_id = lg.id
    WHERE mc.eng_name = ? AND DATE(first_date) AND (last_date) ${firstDateQuery} ${lastDateQuery}
    ORDER BY ${descAndAsc}  	
    LIMIT 12 OFFSET 0
  `, [userId, mainCategoryName]);

  return filtering;
}

const getProductMainCategories = async (mainCategoryName, userId) => {
  const productsMainCategories = await appDataSource.query(`
    SELECT 
	    main_categories.id,
	    mc.mainCategories,
	    sc.subCategories,
      (
        SELECT 
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'productId', w.product_id
            )
          )       
        FROM wishlists AS w
        JOIN users AS u ON w.user_id = u.id
        JOIN products AS p ON w.product_id = p.id
        WHERE u.id = ?
        ) AS wishlists,
	    JSON_ARRAYAGG(
  		  JSON_OBJECT(
          'id', p.id,
    		  'locationGroupName', lg.name,
    		  'thumbnailImageUrl', p.thumbnail_image_url,
    		  'name', p.name,
    		  'price', p.price,
    		  'discountRate', p.discount_rate 
        )
	    ) AS products
	  FROM products AS p
    JOIN (
    	SELECT
    		id, 
    		JSON_ARRAYAGG(
				JSON_OBJECT(
          'id', id,
					'korName', kor_name,
					'engName', eng_name
				)
			) AS mainCategories
		  FROM main_categories
		  WHERE eng_name = ?
		  GROUP BY id
    ) AS mc
	  JOIN (	
		  SELECT 
			  main_category_id,
			  JSON_ARRAYAGG(
				  JSON_OBJECT(
            'id', id,
					  'korName', kor_name,
					  'engName', eng_name
				  )
			  ) as subCategories
      FROM sub_categories
		  GROUP BY main_category_id
	  ) AS sc
	  ON sc.main_category_id = mc.id
	  JOIN location AS l ON p.location_id = l.id
	  JOIN location_groups AS lg ON p.location_id = lg.id
	  JOIN sub_categories ON p.sub_category_id = sub_categories.id
	  JOIN main_categories ON sub_categories.main_category_id = main_categories.id
	  WHERE main_categories.eng_name = ?
	  GROUP BY main_categories.id, mc.mainCategories, sc.subCategories
    LIMIT 12 OFFSET 0
  `, [userId, mainCategoryName, mainCategoryName]);

  return productsMainCategories;
}

const subCategoryFiltering = async (mainCategoryName, subCategoryName, sort, firstDate, lastDate, userId) => {
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
      p.discount_rate AS discountRate,
      (
        SELECT 
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'productId', w.product_id
            )
          )       
        FROM wishlists AS w
        JOIN users AS u ON w.user_id = u.id
        JOIN products AS p ON w.product_id = p.id
        WHERE u.id = ?
        ) AS wishlists
    FROM products AS p
    JOIN sub_categories AS sc ON p.sub_category_id = sc.id
    JOIN main_categories AS mc ON sc.main_category_id = mc.id
    JOIN location AS l ON p.location_id = l.id
    JOIN location_groups AS lg ON l.location_group_id = lg.id
    WHERE mc.eng_name = ? AND sc.eng_name = ?
    AND DATE(first_date) AND (last_date) ${firstDateQuery} ${lastDateQuery}
    ORDER BY ${descAndAsc}  	
    LIMIT 12 OFFSET 0
  `, [userId, mainCategoryName, subCategoryName]);

  return filtering;
}

const getProductSubCategories = async (mainCategoryName, subCategoryName, userId) => {
  const productsSubCategories = await appDataSource.query(`
    SELECT 
      main_categories.id,
      mc.mainCategories,
      sc.subCategories,
      (
        SELECT 
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'productId', w.product_id
            )
          )       
        FROM wishlists AS w
        JOIN users AS u ON w.user_id = u.id
        JOIN products AS p ON w.product_id = p.id
        WHERE u.id = ?
        ) AS wishlists,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', p.id,
          'locationGroupName', lg.name,
          'thumbnailImageUrl', p.thumbnail_image_url,
          'name', p.name,
          'price', p.price,
          'discountRate', p.discount_rate 
        )
      ) AS products
    FROM products AS p
    JOIN (
      SELECT
        id, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', id,
            'korName', kor_name,
            'engName', eng_name
          )
        ) AS mainCategories
      FROM main_categories
      WHERE eng_name = ?
      GROUP BY id
    ) AS mc
    JOIN (	
      SELECT 
        main_category_id,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', id,
            'korName', kor_name,
            'engName', eng_name
          )
        ) as subCategories
      FROM sub_categories
      WHERE eng_name = ?
      GROUP BY main_category_id
    ) AS sc
    ON sc.main_category_id = mc.id
    JOIN location AS l ON p.location_id = l.id
    JOIN location_groups AS lg ON p.location_id = lg.id
    JOIN sub_categories ON p.sub_category_id = sub_categories.id
    JOIN main_categories ON sub_categories.main_category_id = main_categories.id
    WHERE main_categories.eng_name = ? AND sub_categories.eng_name = ?
    GROUP BY main_categories.id, mc.mainCategories, sc.subCategories
    LIMIT 12 OFFSET 0
  `, [userId, mainCategoryName, subCategoryName, mainCategoryName, subCategoryName]);

  return productsSubCategories;
}

const getDetailProducts = async (productId) => {
  const detailProduct = await appDataSource.query(`
    SELECT
      p.id,
      p.name, 
      p.price,
      p.discount_rate AS discountRate, 
      p.thumbnail_image_url AS thumbnailImageUrl,
      p.description,
      l.name AS locationName,
      l.latitude AS latitude,
      l.longitude AS longitude,
      pi.image AS productImages,
      sq.schedules AS schedules,
      le.name AS level  
    FROM products AS p
    LEFT JOIN levels le ON p.level_id = le.id
    LEFT JOIN location l ON p.location_id = l.id
    LEFT JOIN(
      SELECT 
        product_id,
        JSON_ARRAYAGG(image_url) AS image
      FROM product_images
      GROUP BY product_id
    ) pi ON pi.product_id=p.id
    LEFT JOIN(
      SELECT
        product_id,
        JSON_ARRAYAGG(
        JSON_OBJECT(
          'content', content,
          'startTime', TIME_FORMAT(start_time, '%k:%i:%S'),
          'finishTime', TIME_FORMAT(finish_time, '%k:%i:%S'))) AS schedules
      FROM schedules
      GROUP BY product_id
    ) sq ON sq.product_id=p.id
    WHERE p.id=?
  `,[productId])
  return detailProduct;
}

const addProductImages = async(productId, productImageUrl) => {
  await appDataSource.query(`
    INSERT INTO product_images (
      image_url,
      product_id
    ) VALUES (?, ?);`,
    [ productImageUrl, productId ]
  )
}

const createProduct = async(userId, name, firstDate, lastDate, price, description, thumbnailImageUrl, participants, discountRate, scheduleTitle, scheduleEtc, classTypeId, subCategoryId, levelId, locationName, locationLatitude, locationLongitude, locationPlaceUrl, locationGroupName) => {

  const locationGroup = await appDataSource.query(`
    INSERT INTO location_groups (
      name
    ) VALUES (?);`,
    [ locationGroupName ]
  )

  const location = await appDataSource.query(`
    INSERT INTO location (
      name,
      latitude,
      longitude,
      place_url,
      location_group_id
    ) VALUES (?, ?, ?, ?, ?);`,
    [ locationName, locationLatitude, locationLongitude, locationPlaceUrl, locationGroup.insertId ]
  )

  const product = await appDataSource.query(`
  INSERT INTO products (
    name,
    first_date,
    last_date,
    price,
    description,
    thumbnail_image_url,
    participants,
    discount_rate,
    schedule_title,
    schedule_etc,
    class_type_id,
    sub_category_id,
    user_id,
    level_id,
    location_id
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
  [ name, firstDate, lastDate, price, description, thumbnailImageUrl, participants, discountRate, scheduleTitle, scheduleEtc, classTypeId, subCategoryId, userId, levelId, location.insertId ]
  )

  return product.insertId;
}

const addSchedule = async(productId, schedule) => {
  
  const { startTime, finishTime, minutes, content } = schedule

  await appDataSource.query(`
    INSERT INTO schedules (
      start_time,
      finish_time,
      minutes,
      content,
      product_id
    ) VALUES (?, ?, ?, ?, ?);`,
    [ startTime, finishTime, minutes, content, productId ]
  )
}

const getProductsList = async (userId) => {
  return await appDataSource.query(`
    SELECT
      p.id AS productId,
      p.name,
      p.thumbnail_image_url AS image,
      p.last_date AS lastDate,
      s.kor_name AS subCategoryKorName
    FROM products AS p
    JOIN sub_categories AS s ON p.sub_category_id = s.id
    WHERE p.user_id = ?;`,
    [ userId ]
  );
};

const deleteProduct = async (userId, productId) => {
  await appDataSource.query(`
    DELETE
    FROM product_images AS pi
    WHERE pi.product_id = ?;`,
    [ productId ]
  )
  
  await appDataSource.query(`
    DELETE
    FROM events AS e
    WHERE e.product_id = ?;`,
    [ productId ]  
  )
  
  await appDataSource.query(`
    DELETE
    FROM schedules AS s
    WHERE s.product_id = ?;`,
    [ productId ]
  )

  return await appDataSource.query(`
    DELETE
    FROM products AS p
    WHERE p.user_id = ? AND p.id = ?;`,
    [ userId, productId ]
  )
};

module.exports = {
  getProducts,
  mainCategoryFiltering,
  getProductMainCategories,
  subCategoryFiltering,
  getProductSubCategories,
  getDetailProducts,
  addProductImages,
  createProduct,
  addSchedule,
  getProductsList,
  deleteProduct
}