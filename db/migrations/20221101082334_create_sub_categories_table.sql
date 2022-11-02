-- migrate:up
CREATE TABLE sub_categories (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  main_category_id INT NOT NULL,
  CONSTRAINT sub_categories_main_category_id_fkey FOREIGN KEY (main_category_id) REFERENCES main_categories(id)
);

-- migrate:down
DROP TABLE sub_categories;
