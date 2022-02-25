const express = require('express');
const routesAuthor = require('./routes/author.route');
const app = express()
const routeBooks = require('./routes/books.route');
const routesPublisher = require('./routes/publisher.route');
const routes = express.Router();



routes.use('/books', routeBooks);
routes.use('/publishers', routesPublisher);
routes.use('/authors', routesAuthor);





module.exports = routes;