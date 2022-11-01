-- migrate:up
CREATE TABLE gender (
  id INT NOT NULL AUTO_INCREMENT,
  type VARCHAR(10) NOT NULL,
  PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE gender;