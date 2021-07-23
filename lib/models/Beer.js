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

}