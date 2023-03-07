-- migrate:up
CREATE TABLE product_images (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  image_url VARCHAR(500) NOT NULL,
  product_id INT NOT NULL,
  CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id)
);

-- migrate:down
DROP TABLE product_images;