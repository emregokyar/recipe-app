CREATE DATABASE recipe;

CREATE TABLE categories(
	id SERIAL PRIMARY KEY,
	category TEXT UNIQUE	
);

CREATE TABLE dishes(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	intro TEXT,
	proccess TEXT,
	image TEXT,
	category_id INT NOT NULL,
	FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE ingredients(
	id SERIAL PRIMARY KEY,
	ingredient TEXT,
	dish_id INT NOT NULL,
	FOREIGN KEY(dish_id) REFERENCES dishes(id)
);