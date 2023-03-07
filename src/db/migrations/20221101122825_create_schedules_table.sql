-- migrate:up
CREATE TABLE schedules (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  start_time TIME NULL,
  finish_time TIME NULL,
  minutes INT NULL,
  title VARCHAR(100) NOT NULL,
  content VARCHAR(500) NOT NULL,
  product_id INT NOT NULL,
  CONSTRAINT schedules_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id)
);

-- migrate:down
DROP TABLE schedules;