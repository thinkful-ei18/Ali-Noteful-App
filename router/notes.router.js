'use strict';

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res, next) => {
  // const searchNotes = val => (val.title.includes(searchTerm) || val.content.includes(searchTerm));
  let { searchTerm } = req.query;
  // return (!searchTerm) ? res.json(data) : res.json(data.filter(searchNotes)); 
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  // res.json(data.find(item => item.id === id));
  notes.find(id, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      res.json('not found');
    }
  });
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

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});


module.exports = router; 