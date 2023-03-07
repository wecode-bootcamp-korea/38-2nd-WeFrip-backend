-- migrate:up
CREATE TABLE main_categories (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE main_categories;
