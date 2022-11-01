-- migrate:up
CREATE TABLE payments (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  method VARCHAR(50) NOT NULL,
  history DATETIME NULL,
  payment_status_id INT NOT NULL,
  CONSTRAINT payments_payment_status_id_fkey FOREIGN KEY (payment_status_id) REFERENCES payment_status(id)
);

-- migrate:down
DROP TABLE payments;
