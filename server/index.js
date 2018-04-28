'use strict';

const express = require('express');
const app = express();

const Helpers = require('./helpers.js');
const Database = require('./database.js').Database;

const PORT_NUMBER = 3000;

const db = new Database();

app.get('/test', (req, res) => {
  res.status(200).end('Harro');
});

app.listen(PORT_NUMBER, () => {
  Helpers.log(`Server listening on port ${PORT_NUMBER}`, 'C');
});
