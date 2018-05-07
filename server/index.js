'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const Helpers = require('./helpers.js');
const Database = require('./database/database.js').Database;
const UserActions = require('./actions/UserActions');
const Constants = require('./constants.js');

const UserHandler = require('./requestHandlers/userHandler.js');

const db = new Database();
const app = express();

const uploadPath = __dirname + '/uploads';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
    Helpers.log(`-${req.method} REQUEST: ${req.url}`, 'C')
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,userID');
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

app.get('/uploads/:uploader/:imageName', (req, res) => {
  res.sendFile(path.join(uploadPath, req.params.uploader, req.params.imageName));
});

app.post('/upload', (req, res) => {
  let form = new formidable.IncomingForm();
  Helpers.log('Upload path called', 'C');
  try {
    form.parse(req, (err, fields, files) => {
      if (err) {
        throw err;
      } else {
        const token = Helpers.token();
        const extension = Helpers.getExtension(files.uploadFile.name);
        const user = req.get('userID');

        console.log(files.uploadFile.size);
        if (files.uploadFile.size >= Constants.MAX_FILESIZE) {
          throw new Error('Filesize is too large');
        }

        Helpers.log(`Writing: ${token}.${extension} for uid#${user}`, 'C');

        const purpose = fields.purpose;
        const filename = `${token}.${extension}`;
        const uploadPathWithUsername = `${uploadPath}/${user}`;

        if (purpose === 'userImage') UserActions.assignImage(filename, user, uploadPathWithUsername, db);

        const oldPath = files.uploadFile.path;
        const newPath = `${uploadPathWithUsername}/${filename}`;

        fs.mkdir(uploadPathWithUsername, (err) => {
          if (err && err.code !== 'EEXIST') {
            throw err;
          } else {
            fs.rename(oldPath, newPath, (err) => {
              if (err) {
                throw err;
              } else {
                // Should send back token
                Helpers.log('File write successful', 'G');
                res.status(200).end(`${token}.${extension}`);
              }
            });
          }
        });
      }
    });
  } catch (e) {
    res.status(500).end(e.message);
  }
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

// Start the server
db.initialize().then(() => {
  app.listen(Constants.PORT_NUMBER, () => {
    Helpers.log(`Server listening on port ${Constants.PORT_NUMBER}`, 'C');
  });
}).catch(err => {
  Helpers.log(`Error starting server/db: ${err}`, 'R');
});
