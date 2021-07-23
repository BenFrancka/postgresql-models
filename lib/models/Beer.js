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

}