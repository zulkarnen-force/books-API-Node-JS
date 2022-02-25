const {Pool} = require('pg');
const { nanoid } = require('nanoid')

class PublisherService {

    constructor() {
        this.db = new Pool();
    }

    async getPublishers() {
        try {
            return (await this.db.query('SELECT * FROM Publisher')).rows;
        } catch (err) {
            throw err;
        }
    }

   

    async getPublisherById(id) {
        try {
            const publisher = (await this.db.query(`SELECT * FROM Publisher WHERE publisher_id=$1`, [id]));

            if (!publisher.rowCount) {
                throw new RangeError(`publisher with id ${id} not found`)
            }
            return publisher.rows[0]

        } catch (err) {
            throw err;
        } 
    }


    

    async addPublisher({name, city}) {

  
        const id = `PUB-${nanoid(5)}`;  
        const createdAt = new Date().toLocaleString("id-ID");;
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO Publisher (publisher_id, name, city, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING publisher_id',
            values: [id, name, city, createdAt, updatedAt]
        }

        try {
            console.info(`values: ${query.values}`)
            const result = await this.db.query(query);

            console.info('Row Count ', result.rowCount);

            if (!result.rowCount) {
                throw new Error('Add new note failure')
            }
    
            return result.rows[0].publisher_id;
            
        } catch (err) {
            throw err;
        } 

        
    }



    async updatePublisherById(id, {name, city}) {
        
        const updatedAt = new Date().toLocaleString("id-ID");
        const query = {
            text: 'UPDATE Publisher SET name=$1, city=$2, updated_at=$3 WHERE publisher_id=$4 RETURNING *',
            values: [name, city, updatedAt, id]
        }

        try {
            
            const result = await this.db.query(query);
          
            if (!result.rows[0]) {
                throw new Error('update publisher failure')
            }

            return result.rows[0];
            
        } catch (err) {
            console.info(`err.stack :${err.stack}`);
            throw err;
        } 

        

    }



    async deletePublisherById(id) {
        
        const query = {
            text: 'DELETE FROM Publisher WHERE publisher_id=$1 RETURNING *',
            values: [id]
        }

        try {
            
            const r = await this.db.query(query);

            if (!r.rows[0]) {
                throw new Error('delete publisher failure')
            }
    
            return r.rows[0];
            
        } catch (err) {
            throw err;
        } 

        

    }


    async getDetailsPublisherById(id) {
        
        const q = {
            text: `SELECT Book.book_id, Book.title, Book.pages, Author.name FROM Book JOIN
            Author ON Book.author_id= Author.author_id WHERE Book.publisher_id = $1`,
            values: [id]
        }

        
        try {
            const booksOfPublisher = (await this.db.query(q)).rows;
            const publisher = await this.getPublisherById(id)
            console.info("booksOfPublisher ", booksOfPublisher);
            console.info("publisher ", publisher);

            
            return Object.assign({publisher: {
                id: publisher.publisher_id,
                name: publisher.name,
                city: publisher.city,
                countBooks: booksOfPublisher.length,
                books: booksOfPublisher
            }})

        } catch (e) {
            console.error(e);
        }

    }

        

        
}







module.exports = PublisherService;