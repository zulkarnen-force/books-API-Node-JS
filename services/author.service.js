const { Pool } = require('pg');
const { nanoid } = require('nanoid')

class AuthorService {

    constructor() {
        this.db = new Pool();
    }

    async getAuthors() {
        try {
            return (await this.db.query('SELECT * FROM Author')).rows;
        } catch (err) {
            throw err;
        }
    }

   

    async getAuthorById(id) {
        try {
            const author = (await this.db.query(`SELECT * FROM Author WHERE author_id=$1`, [id]));

            if (!author.rowCount) {
                throw new RangeError(`author with id ${id} not found`)
            }
            return author.rows[0]

        } catch (err) {
            throw err;
        } 
    }


    

    async addAuthor({name}) {

  
        const id = `AUT-${nanoid(5)}`;  
        const createdAt = new Date().toLocaleString("id-ID");;
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO Author (author_id, name, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING author_id',
            values: [id, name, createdAt, updatedAt]
        }

        try {

            const result = await this.db.query(query);

            if (!result.rowCount) {
                throw new Error('add new author failure')
            }
    
            return result.rows[0].author_id;
            
        } catch (err) {
            throw err;
        } 

        
    }



    async updateAuthorById(id, {name}) {
        
        const updatedAt = new Date().toLocaleString("id-ID");
        const query = {
            text: 'UPDATE Author SET name=$1, updated_at=$2 WHERE author_id=$3 RETURNING *',
            values: [name, updatedAt, id]
        }

        try {
            
            const result = await this.db.query(query);
          
            if (!result.rows[0]) {
                throw new Error('update author failure')
            }

            return result.rows[0];
            
        } catch (err) {
            console.info(`err.stack :${err.stack}`);
            throw err;
        } 

        

    }



    async deleteAuthorById(id) {
        
        const query = {
            text: 'DELETE FROM Author WHERE author_id=$1 RETURNING *',
            values: [id]
        }

        try {
            
            const r = await this.db.query(query);

            if (!r.rows[0]) {
                throw new Error('delete Author failure')
            }
    
            return r.rows[0];
            
        } catch (err) {
            throw err;
        } 

        

    }



    async authorDetailById(id) {
        const q = {
            text: `SELECT Author.*, Book.book_id, Book.title, Book.pages FROM Author JOIN
            Book ON Book.author_id= Author.author_id WHERE Author.author_id = $1`,
            values: [id]
        }

        try {
            
            const author = await (await this.db.query(`SELECT author_id, name, created_at, updated_at FROM Author WHERE author_id = $1`, [id])).rows[0]
            const r = (await this.db.query(q)).rows;
            
           
            const books = r.map( e => {
                return {
                    id: e.book_id, 
                    title: e.title,
                    pages: e.pages
                }
            })

            const countBooks = books.length;

            const authorWithCountBooks = Object.assign(author, {countBooks});
            
            
            return {author: authorWithCountBooks, books}

        } catch (e) {
            throw e;
        }
    }

    
}




module.exports = AuthorService;