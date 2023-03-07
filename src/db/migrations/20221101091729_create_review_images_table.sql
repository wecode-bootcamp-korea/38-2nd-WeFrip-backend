-- migrate:up
CREATE TABLE review_images (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  image_url VARCHAR(500) NOT NULL,
  review_id INT NOT NULL,
  CONSTRAINT review_images_review_id_fkey FOREIGN KEY (review_id) REFERENCES reviews(id)
);

-- migrate:down
DROP TABLE review_images;