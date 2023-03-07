-- migrate:up
ALTER TABLE users 
  ADD COLUMN introduction TEXT NULL,
  CHANGE name host_name VARCHAR(50) NULL

-- migrate:down

