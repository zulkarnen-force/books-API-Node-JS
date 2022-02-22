const {Pool} = require('pg');
const { nanoid, random, customRandom } = require('nanoid')

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
            return book.rows[0]

        } catch (err) {
            throw err;
        } 
    }


    

    async addBook({title, authors, isbn, pages, year}) {

        console.info(JSON.stringify(authors))

        console.info(authors)

        const id = `book-${year}${nanoid(5)}`;
        // const isbn = parseInt(customRandom(`1234567890`, 10).toString());
        const createdAt = new Date().toLocaleString("id-ID");;
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO book (id, title, authors, isbn, pages, year, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [id, title, authors, isbn, pages, year, createdAt, updatedAt]
        }

        try {
            console.info(`values: ${query.values}`)
            const result = await this.db.query(query);

            if (!result.rows[0].id) {
                throw new Error('Add new note failure')
            }
    
            return result.rows[0].id;
            
        } catch (err) {
            throw err;
        } 

        

    }



    async updateBookById(id, {title, authors, isbn, pages, year}) {
        
        const updatedAt = new Date().toLocaleString("id-ID");
        const query = {
            text: 'UPDATE book SET title = $1, authors = $2, isbn = $3, pages = $4, year = $5, updated_at= $6 WHERE id=$7 RETURNING id',
            values: [title, authors, isbn, pages, year, updatedAt, id]
        }

        try {
            
            const resultID = await (await this.db.query(query)).rows[0];

            console.info(resultID)

            if (!resultID) {
                throw new Error('Add new note failure')
            }
    
            return resultID;
            
        } catch (err) {
            console.info(`err.stack :${err.stack}`);
        } 

        

    }

    
}




module.exports = BookService;