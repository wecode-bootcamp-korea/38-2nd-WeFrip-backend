-- migrate:up
ALTER TABLE products 
  ADD COLUMN discount_rate DECIMAL(4,2) NULL,
  ADD COLUMN schedule_title VARCHAR(500) NULL,
  ADD COLUMN schedule_etc VARCHAR(500) NULL

-- migrate:down

