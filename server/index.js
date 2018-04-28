'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const Helpers = require('./helpers.js');
const Database = require('./database/database.js').Database;
const Constants = require('./constants.js');

const UserHandler = require('./requestHandlers/userHandler.js');

const db = new Database();
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Routes
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
    res.status(500).send(err);
  });
});

/**
 * For handling a new user being created or modified
 */
app.post('/users', (req, res) => {
  UserHandler.handleSignup(req, res, db);
});

/**
 * For handling logins of users
 */
app.post('/login', (req, res) => {
  UserHandler.handleLogin(req, res, db);
});

db.initialize().then(() => {
  app.listen(Constants.PORT_NUMBER, () => {
    Helpers.log(`Server listening on port ${Constants.PORT_NUMBER}`, 'C');
  });
}).catch(err => {
  Helpers.log(`Error starting server/db: ${err}`, 'R');
});
