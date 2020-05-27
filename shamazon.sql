CREATE DATABASE Shamazon;

USE Shamazon;
// --  table called products which contain the store
CREATE TABLE products(
  item_id INTEGER(22) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(23) NOT NULL,
  department_name VARCHAR(19) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(12) NOT NULL,
  PRIMARY KEY(item_id)
);

// -- QUERY to select products from all categories of one parent
SELECT * FROM products;


// --  inserting into products table
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Pogs", "Fads", 1.99, 100),
  ("Mouse Pogs", "Fads", 1.98, 120),
  ("SuperSoaker 50", "Summer Fun", 29.95, 50),
  ("Slip n Slide", "Summer Fun", 75.00, 200),
  ("Sun Tan Lotion", "Summer Fun", 5.55, 55),
  ("Survival Towel", "PumpkinSpiceLife", 42.42, 42),
  ("Pumpkin Spice latte", "PumpkinSpiceLife", 9.87, 5000),
  ("Pumpkin Spice Gummi Worms", "PumpkinSpiceLife", 1.97, 3000),
  ("Pumpkin Spice Poster", "PumpkinSpiceLife", 8,76, 2000),
  ("Pumpkin CatNip Ball", "Cat Toys", 19.95, 60),
  ("Bottle Rockets", "Summer Fun", 12.99, 4444),
  ("Food Pogs", "Fads", 1.97, 300),
  ("Mcguffin", "Summer Fun", 1.01, 2),
  ("Fish on a Rope", "Cat Toys", 5.55, 50);
