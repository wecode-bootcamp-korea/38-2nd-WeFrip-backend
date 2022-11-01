-- migrate:up
CREATE TABLE orders (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  persons INT DEFAULT 1,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  order_status_id INT DEFAULT 1,
  payment_id INT DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT orders_order_status_id_fkey FOREIGN KEY (order_status_id) REFERENCES order_status(id),
  CONSTRAINT orders_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES payments(id)
);

-- migrate:down
DROP TABLE orders;