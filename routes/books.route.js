const routeBooks = require('express').Router();

routeBooks.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        data: {
            nama: 'example-name',
        },
        links: {
            self: `books/req.url`,
            ref: 'localhost:3000/books/{bookid}'
        }
    })
})



routeBooks.get('/:bookid', (req, res) => {
    // TODO

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