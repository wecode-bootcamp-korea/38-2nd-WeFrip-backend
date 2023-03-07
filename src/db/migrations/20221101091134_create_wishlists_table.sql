-- migrate:up
CREATE TABLE wishlists (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT wishlists_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT wishlists_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE wishlists;