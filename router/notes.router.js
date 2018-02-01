'use strict';

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res, next) => {
  let { searchTerm } = req.query;
  notes.filter(searchTerm)
    .then((item) => {
      if(item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  notes.find(id)
    .then((item) => {
      if (item) {
        res.json(item);
      } else {
        res.json('not found');
      }
    })
    .catch(next);
});

router.put('/:id',  (req, res, next) => {
  const id = req.params.id;
  const updateObj = {};
  const updateFields = ['title', 'content'];
  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj)
    .then((item) => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const {title, content} = req.body;
  const newItem = {title, content};
  if (!newItem.title) {
    const err = new Error('Missing "title" in request body');
    err.status = 400; 
    return next(err);
  } 
  notes.create(newItem)
    .then((item) => {
      if (item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      } else {
        next();
      }
    })
    .catch(next);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  notes.delete(id)
    .then((result) => {
      if (result) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    }).catch(err => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      } 
    });
});

module.exports = router; 