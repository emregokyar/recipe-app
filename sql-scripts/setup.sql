CREATE DATABASE recipe;

CREATE TABLE dishes(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	intro TEXT,
	proccess TEXT,
	image TEXT
);

CREATE TABLE ingredients(
	id SERIAL PRIMARY KEY,
	ingredient TEXT,
	dish_id INT NOT NULL,
	FOREIGN KEY(dish_id) REFERENCES dishes(id)
);

CREATE TABLE categories(
	id SERIAL PRIMARY KEY,
	category TEXT,
	dish_id INT NOT NULL,
	UNIQUE (category, dish_id),
	FOREIGN KEY(dish_id) REFERENCES dishes(id)
);