const {Pool} = require('pg');
const { nanoid, random, customRandom } = require('nanoid')

class BookService {

    constructor() {
        this.db = new Pool();
    }

    async getBooks() {
        try {

            const booksData = (await this.db.query(`SELECT Book.book_id AS id, Book.title, Author.name AS author_name FROM Book
                JOIN Author ON Author.author_id = Book.author_id`)).rows;


            const books = booksData.map(book => {
                
                return {id:book.id, title:book.title, authorName: book.author_name}

            })

            return books;   

        } catch (err) {
            throw err;
        }

    }

    async getBooksSortBy(sortQuery) {
        try {
            const result = await this.db.query(`SELECT * FROM book ORDER BY ${sortQuery}`);
            console.log({Hasil: {datas: result.rows}});
            return result.rows
        } catch (err) {
            throw err;
        }
    }



    async getBookById(id) {
        try {
            const book = (await this.db.query(`SELECT Book.book_id AS id, Book.title, Author.name, Book.isbn, Book.pages, 
            Book.year, Book.created_at , Book.updated_at FROM Book JOIN Author ON Author.author_id = Book.author_id WHERE book_id=$1` , [id]));

            if (!book.rowCount) {
                throw new RangeError(`book with id ${id} not found`)
            }
            return book.rows[0] 

        } catch (err) {
            throw err;
        } 
    }


    

    async addBook({title, isbn, pages, year, author_id, publisher_id}) {

  
        const id = `book-${year}${nanoid(5)}`;  
        const createdAt = new Date().toLocaleString("id-ID");;
        const updatedAt = createdAt;

        const query = {
            text: `INSERT INTO Book (book_id, title, isbn, pages, year, created_at, updated_at, author_id, publisher_id) VALUES 
                                    ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING book_id`,
            values: [id, title, isbn, pages, year, createdAt, updatedAt, author_id, publisher_id]
        }

        try {
            
            const result = await this.db.query(query);

            if (!result.rows[0].book_id) {
                throw new Error('Add new note failure')
            }
    
            return result.rows[0].book_id;
            
        } catch (err) {
            throw err;
        } 

        

    }



    async updateBookById(id, {title, authors, isbn, pages, year}) {
        
        const updatedAt = new Date().toLocaleString("id-ID");
        const query = {
            text: 'UPDATE book SET title=$1, authors=$2, isbn=$3, pages=$4, year=$5, updated_at=$6 WHERE id=$7 RETURNING *',
            values: [title, authors, isbn, pages, year, updatedAt, id]
        }

        try {
            
            const result = await this.db.query(query);
          
            if (!result.rows[0]) {
                throw new Error('Add new note failure')
            }

            return result.rows[0];
            
        } catch (err) {
            console.info(`err.stack :${err.stack}`);
        } 

        

    }



    async deleteBookById(id) {
        
        const query = {
            text: 'DELETE FROM book WHERE id=$1 RETURNING *',
            values: [id]
        }

        try {
            
            const r = await this.db.query(query);

            console.info(r.rows[0])

            if (!r.rows[0]) {
                throw new Error('book deleted book on query')
            }
    
            return r.rows[0];
            
        } catch (err) {
            throw err;
        } 

    }

    
}




module.exports = BookService;