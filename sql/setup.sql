DROP TABLE IF EXISTS dinosaurs;

CREATE TABLE dinosaurs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    species TEXT NOT NULL,
    diet TEXT NOT NULL,
    time_period TEXT NOT NULL
);

DROP TABLE IF EXISTS relatives;

CREATE TABLE relatives (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NOT NULL,
    relation TEXT NOT NULL,
    number_of_siblings INTEGER NOT NULL,
    age INTEGER NOT NULL
);

DROP TABLE IF EXISTS beers;

CREATE TABLE beers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    beer_name TEXT NOT NULL,
    nationality TEXT NOT NULL,
    variety TEXT NOT NULL,
    alcohol_percentage INTEGER NOT NULL
);
