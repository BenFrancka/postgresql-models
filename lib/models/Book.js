import pool from "../utils/pool";

export default class Book {
    id;
    title;
    authorName;
    pageCount;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.authorName = row.author_name;
        this.pageCount = row.page_count;
    }

    static async insert({ title, authorName, pageCount }) {
        const { rows } = await pool.query(
            'INSERT INTO books (title, author_name, page_count) VALUES ($1, $2, $3) RETURNING *',
            [title, authorName, pageCount]
        );

        return new Book(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM books WHERE id=$1',
            [id]
        );

        return new Book(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM books',
        );

        return rows.map((row) => new Book(row));
    }

    static async updateById(id, { title, authorName, pageCount }) {
        const existingBook = await Book.getById(id);
        const newTitle = title ?? existingBook.title;
        const newAuthorName = authorName ?? existingBook.authorName;
        const newPageCount = pageCount ?? existingBook.pageCount;
        

        const { rows } = await pool.query(
            'UPDATE books SET title=$1, author_name=$2, page_count=$3 WHERE id=$4 RETURNING *',
            [newTitle, newAuthorName, newPageCount, id]
        );

        return new Book(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            'DELETE FROM books WHERE id=$1 RETURNING *',
            [id]
        );

        return new Book(rows[0]);
    }
}