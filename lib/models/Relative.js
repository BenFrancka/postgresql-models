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

    
}