'use strict';

const { PORT } = require('./config');
const morgan = require('morgan');


const express = require('express');
const app = express();
const notesRouter = require('./router/notes.router');

app.use(morgan('dev'));

app.use('/v1/notes', notesRouter);
app.use(express.static('public'));
app.use(express.json());




app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});



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
