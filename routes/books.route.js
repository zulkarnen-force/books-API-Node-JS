const routeBooks = require('express').Router();
const { DatabaseError } = require('pg');
const BookService = require('../services/books.service');


let bookService = new BookService();


function responseError({res, code=500, status='internal server error', message='error from internal',  detail=''})  {

    console.info(`Status bug ${status}`)
   
    const errorValues = Object.assign({}, 
        code ? {code} : null,
        status ? {status}  : null,
        message ? {message}  : null,
        detail ? {detail}: null
    )
  
  
    return res.status(code).json({
      errors: errorValues
    })
  

}

routeBooks.get('/', async (req, res) => {

    try {
        const r = await bookService.getBooks();
        res.status(200).json({
            success: true, 
            books: r
        })
    } catch (err) {
        if (err instanceof DatabaseError) {
            responseError({res, message: err.message})
        }
    }

    

    // res.status(200).json({
    //     status: true,
    //     data: {
    //         nama: 'example-name',
    //     },
    //     links: {
    //         self: `books/req.url`,
    //         ref: 'localhost:3000/books/{bookid}'
    //     }
    // })
})



routeBooks.get('/:bookid', async (req, res) => {
    // TODO

    try {
        const r = await bookService.getBookById(req.params.bookid);
        res.status(200).json({
            success: true, 
            books: r
        })
    } catch (err) {
        if (err instanceof DatabaseError) {
            responseError({res, message: err.message})
        } else if (err instanceof RangeError) {
            responseError({res, code: 404, status: 'not found', message: err.message})
        }
    }

})

routeBooks.post('/', (req, res) => {
    // TODO

})



routeBooks.put('/', (req, res) => {
    // TODO
})

routeBooks.delete('/:bookid', (req, res) => {
    // TODO

})





module.exports = routeBooks;