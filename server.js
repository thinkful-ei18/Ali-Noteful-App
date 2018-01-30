'use strict';

const data = require('./db/notes');
const {PORT} = require('./config.js');
const {logger} = require('./middleware');
const {simDB} = require('./db/simDB');

console.log('hello world!');

const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(logger);

app.get('/v1/notes', (req, res) => {
  const searchNotes = val => (val.title.includes(searchTerm) || val.content.includes(searchTerm));
  let { searchTerm } = req.query;
  return (!searchTerm) ? res.json(data) : res.json(data.filter(searchNotes)); 
});

app.get('/v1/notes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.json(data.find(item => item.id === id));
});

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});
// app.post('/v1/notes/', (req, res) => {

// });


app.use(function (req, res, next) {
  let err = new Error ('Not Found');
  err.status = 404;
  res.status(404).json({message: 'Not Found' });
});

app.use(function (err, req, res, next){
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, () => console.log('server working'));
// INSERT EXPRESS APP CODE HERE...

// Next you'll create Express Middleware to log the request. Hint, we suggest you first create the middleware in the server.js file. Then, once it is working, then move the middleware to a module. To confirm it is working, restart your app and make a few requests to the GET /v1/notes endpoint. Each request should be logged to the console, something like this:

