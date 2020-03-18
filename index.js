const handlers = require('./handlers');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const serverless = require('serverless-http');
app.use(bodyParser.json({ strict: false }));


//get all books
app.get('/books', handlers.getAllBooks);

//get one bok
app.get('/book/:bookUuid', handlers.getBook);

//update one book
app.post('/book/:bookUuid/update', handlers.updateBook);

//delete one book
app.post('/book/:bookUuid/delete', handlers.deleteBook);

//add book
app.post('/book/add', handlers.addBook);

module.exports.handler = serverless(app);