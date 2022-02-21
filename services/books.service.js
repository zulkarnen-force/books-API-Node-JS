const {Pool} = require('pg');

class BookService {

    constructor() {
        this.db = new Pool();
    }

    async getBooks() {
        try {
            return (await this.db.query('SELECT * FROM book')).rows;
        } catch (err) {
            throw err;
        }
    }


    async getBookById(id) {
        try {
            const book = (await this.db.query(`SELECT * FROM book WHERE id=$1`, [id]));
            if (!book.rowCount) {
                throw new RangeError(`book with id ${id} not found`)
            }
        } catch (err) {
            throw err;
        } 
    }

    
}




module.exports = BookService;