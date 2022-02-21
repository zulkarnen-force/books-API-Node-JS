const express = require('express');
const app = express()
const routeBooks = require('./routes/books.route');
const routes = express.Router();


routes.use('/books', routeBooks);



module.exports = routes;