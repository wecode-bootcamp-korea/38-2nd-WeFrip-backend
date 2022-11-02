-- migrate:up
CREATE TABLE location_groups (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE location_groups;
