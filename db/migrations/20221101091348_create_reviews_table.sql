-- migrate:up
CREATE TABLE reviews (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ratings FLOAT NOT NULL,
  content VARCHAR(1000) NOT NULL,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id)
);

-- migrate:down
DROP TABLE reviews;