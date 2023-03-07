-- migrate:up
CREATE TABLE class_types (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE class_types;