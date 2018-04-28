'use strict';

const express = require('express');
const app = express();

const Helpers = require('./helpers.js');
const Database = require('./database.js').Database;
const Constants = require('./constants.js');

const db = new Database();

app.get('/test', (req, res) => {
  res.status(200).end('Harro');
});

app.post('/serialize', (req, res) => {
  db.serialize();
  res.status(200).end('Done');
});

app.post('/dummy-data', (req, res) => {
  db.populateDummyData();
  res.status(200).end('Done');
});

app.get('/test-get-users', (req, res) => {
  db.testGetUsers().then(data => {
    res.status(200).send(JSON.stringify(data));
  }).catch(err => {
    Helpers.log(err, 'R');
    res.status(500).send(err)
  });
});

app.listen(Constants.PORT_NUMBER, () => {
  Helpers.log(`Server listening on port ${Constants.PORT_NUMBER}`, 'C');
});
