import pool from "../utils/pool";

export default class Beer {
    id;
    beerName;
    nationality;
    variety;
    alcoholPercentage;

    constructor(row) {
        this.id = row.id;
        this.beerName = row.beer_name;
        this.nationality = row.nationality;
        this.variety = row.variety;
        this.alcoholPercentage = row.alcohol_percentage;
    }

    static async insert({ beerName, nationality, variety, alcoholPercentage }) {
        const { rows } = await pool.query(
            'INSERT INTO beers (beer_name, nationality, variety, alcohol_percentage) VALUES ($1, $2, $3, $4) RETURNING *',
            [beerName, nationality, variety, alcoholPercentage]
        );

        return new Beer(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM beers WHERE id=$1',
            [id]
        );

        return new Beer(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM beers',
        );

        return rows.map((row) => new Beer(row));
    }

    static async updateById(id, { beerName, nationality, variety, alcoholPercentage }) {
        const existingBeer = await Beer.getById(id);
        const newBeerName = beerName ?? existingBeer.beerName;
        const newNationality = nationality ?? existingBeer.nationality;
        const newVariety = variety ?? existingBeer.variety;
        const newAlcoholPercentage = alcoholPercentage ?? existingBeer.alcoholPercentage;

        const { rows } = await pool.query(
            'UPDATE beers SET beer_name=$1, nationality=$2, variety=$3, alcohol_percentage=$4 WHERE id=$5 RETURNING *',
            [newBeerName, newNationality, newVariety, newAlcoholPercentage, id]
        );

        return new Beer(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            'DELETE FROM beers WHERE id=$1 RETURNING *',
            [id]
        );

        return new Beer(rows[0]);
    }

}