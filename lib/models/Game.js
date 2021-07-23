import pool from "../utils/pool";

export default class Game {
    id;
    title;
    gameSystem;
    genre;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.gameSystem = row.gameSystem;
        this.genre = row.genre;
    }
}