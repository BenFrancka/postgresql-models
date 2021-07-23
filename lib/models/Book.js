import pool from "../utils/pool";

export default class Beer {
    id;
    beerName;
    nationality;
    variety;
    alcoholPercentage;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.authorName = row.author_name;
        this.pageCount = row.page_count;
    }
}