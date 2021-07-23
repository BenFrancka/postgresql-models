import pool from "../utils/pool";

export default class Dinosaur {
    id;
    species;
    diet;
    timePeriod;

    constructor(row) {
        this.id = row.id;
        this.species = row.species;
        this.diet = row.diet;
        this.timePeriod = row.time_period;
    }

    static async insert({ species, diet, timePeriod }) {
        const { rows } = await pool.query('INSERT INTO dinosaurs (species, diet, time_period) VALUES ($1, $2, $3) RETURNING *',[species, diet, timePeriod]
        );

        return new Dinosaur(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM dinosaurs WHERE id=$1', [id]);

        return new Dinosaur(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * from dinosaurs');

        return rows.map((row) => new Dinosaur(row));
    }

    static async updateById(id, { species, diet, timePeriod }) {
        const existingDinosaur = await Dinosaur.getById(id);
        const newSpecies = species ?? existingDinosaur.species;
        const newDiet = diet ?? existingDinosaur.diet;
        const newTimePeriod = timePeriod ?? existingDinosaur.timePeriod;

        const { rows } = await pool.query('UPDATE dinosaurs SET species=$1, diet=$2, time_period=$3 WHERE id=$4 RETURNING *', [newSpecies, newDiet, newTimePeriod, id]);

        return new Dinosaur(rows[0]);
    }
}


