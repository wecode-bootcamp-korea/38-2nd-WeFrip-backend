-- migrate:up
CREATE TABLE location (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(10) NOT NULL,
  latitude DECIMAL NULL,
  longitude DECIMAL NULL,
  location_group_id INT NULL,
  CONSTRAINT location_location_group_id_fkey FOREIGN KEY (location_group_id) REFERENCES location_groups(id)
);

-- migrate:down
DROP TABLE location;