-- migrate:up
ALTER TABLE location 
  MODIFY latitude DECIMAL(10, 8) NULL,
  MODIFY longitude DECIMAL(12, 8) NULL

-- migrate:down

