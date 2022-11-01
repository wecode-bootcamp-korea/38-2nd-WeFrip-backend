-- migrate:up
CREATE TABLE payment_status (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  status VARCHAR(50) NOT NULL
);

-- migrate:down
DROP TABLE payment_status;
