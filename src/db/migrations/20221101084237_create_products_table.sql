-- migrate:up
CREATE TABLE products (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  first_date DATE NOT NULL,
  last_date DATE NULL,
  price DECIMAL NOT NULL,
  description VARCHAR(1000) NULL,
  thumbnail_image_url VARCHAR(500) NULL,
  participants INT DEFAULT 1,
  class_type_id INT NOT NULL,
  sub_category_id INT NOT NULL,
  user_id INT NOT NULL,
  level_id INT NULL,
  location_id INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT products_class_type_id_fkey FOREIGN KEY (class_type_id) REFERENCES class_types(id),
  CONSTRAINT products_sub_category_id_fkey FOREIGN KEY (sub_category_id) REFERENCES sub_categories(id),
  CONSTRAINT products_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT products_level_id_fkey FOREIGN KEY (level_id) REFERENCES levels(id),
  CONSTRAINT products_location_id_fkey FOREIGN KEY (location_id) REFERENCES location(id)
);

-- migrate:down
DROP TABLE products;