CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price INT
);

INSERT INTO products (name, price) VALUES
('Laptop', 50000),
('Mobile', 20000),
('Headphones', 3000);