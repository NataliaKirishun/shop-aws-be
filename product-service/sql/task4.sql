-- create  uuid extension
    CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';

-- create product table:
    create table products (
  	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  	title text not null,
  	description text,
  	price integer
  );

-- delete product table:
    drop table products;

-- create stocks table:
    create table stocks (
	product_id uuid primary KEY,
	count integer,
	foreign key ('product_id') references 'products' ('id')
)

-- delete stocks table:
    drop table stocks

-- fill products table
    insert into products (title, description, price) values
    ('ProductNew', 'Short Product Description3', 10),
    ('ProductTop', 'Short Product Description2', 23),
    ('ProductTitle', 'Short Product Description7', 15),
    ('Product', 'Short Product Description2', 23),
    ('ProductTest', 'Short Product Description4', 15),
    ('Product2', 'Short Product Description1', 23),
    ('ProductName', 'Short Product Description7', 15)

-- fill stocks table
insert into stocks (product_id, count) values
('a4cc7bd3-dc54-4576-814a-e7080e2efdd1', 6 ),
('cd3a0193-e700-4e83-969d-e34f41427901', 7 ),
('ff4510a6-891e-4e5f-b486-b4114d261066', 12 ),
('0c4f041e-188c-47f7-a010-386c48d28d65', 7 ),
('2f198991-26ce-47e3-8447-a41c07c1cca4', 8 ),
('47adbe16-f784-4bca-9d22-2edc4207a279', 2 ),
('cbe9758d-1738-4aea-83ad-9cf859ea1441', 3 )
