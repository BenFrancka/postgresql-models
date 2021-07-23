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
        const { rows } = await pool.query('SELECT * from relatives WHERE id=$1', 
        [id]);

        return new Relative(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * from relatives');

        return rows.map((row) => new Relative(row));
    }

    static async updateById(id, { firstName, relation, numberOfSiblings, age }) {
        const existingRelative = await Relative.getById(id);
        const newFirstName = firstName ?? existingRelative.firstName;
        const newRelation = relation ?? existingRelative.relation;
        const newNumberOfSiblings = numberOfSiblings ?? existingRelative.numberOfSiblings;
        const newAge = age ?? existingRelative.age;

        const { rows } = await pool.query('UPDATE relatives SET first_name=$1, relation=$2, number_of_siblings=$3, age=$4 WHERE id=$5 RETURNING *',
        [
            newFirstName,
            newRelation,
            newNumberOfSiblings,
            newAge,
            id
        ]);

        return new Relative(rows[0]);
    }


}