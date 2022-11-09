-- migrate:up
ALTER TABLE sub_categories 
  ADD COLUMN kor_name VARCHAR(100) NOT NULL,
  CHANGE name eng_name VARCHAR(100) NOT NULL

-- migrate:down

