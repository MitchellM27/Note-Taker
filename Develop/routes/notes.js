const noting = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

noting.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

noting.post('/', (req, res) => {
  const { title, text} = req.body;

  if (title && text) {
    const newNotes = {
      title,
      text,
    };

    readAndAppend(newNotes, './db/db.json');

    const response = {
      status: 'success',
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json('Error in posting notes');
  }
});

module.exports = noting;
