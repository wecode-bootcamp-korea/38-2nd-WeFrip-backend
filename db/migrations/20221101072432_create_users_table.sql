-- migrate:up
CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NULL,
  nickname VARCHAR(50) NULL,
  profile_image_url VARCHAR(1000) NULL,
  email VARCHAR(100) NULL,
  password VARCHAR(100) NULL,
  kakao_id bigint UNIQUE NOT NULL,
  phone_number VARCHAR(50) NULL,
  address VARCHAR(100) NULL,
  birthday VARCHAR(20) NULL,
  point DECIMAL DEFAULT 100000,
  gender_id INT NOT NULL,
  is_host BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT users_gender_id_fkey FOREIGN KEY (gender_id) REFERENCES gender(id)
);

-- migrate:down
DROP TABLE users;
