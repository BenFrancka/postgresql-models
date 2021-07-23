import pool from "../utils/pool";

export default class Relative {
    id;
    species;
    diet;
    timePeriod;

    constructor(row) {
        this.id = row.id;
        this.firstName = row.first_name;
        this.relation = row.relation;
        this.numberOfSiblings = row.number_of_siblings;
        this.age = row.age;
    }

    static async insert({ firstName, relation, numberOfSiblings, age }) {
        const { rows } = await pool.query('INSERT INTO relatives (first_name, relation, number_of_siblings, age) VALUES ($1, $2, $3, $4) RETURNING *', 
        [firstName, relation, numberOfSiblings, age]);

        return new Relative(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * from relativs WHERE id=$1', 
        [id]);

        return new Relative(rows[0]);
    }
}