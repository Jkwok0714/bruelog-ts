const sqlite = require('sqlite3');

const Constants = require('../constants.js');
const Helpers = require('../helpers.js');
const Serialize = require('./database-serialize.js');

class Database {
  constructor () {
    this.db = null;
  }

  initialize () {
    return new Promise ((resolve, reject) => {
      this.db = new sqlite.Database(Constants.DATABASE_FILE, (err) => {
        if (err) {
          Helpers.log(`Error initializing db: ${e.message}`, 'R');
          reject(err.message);
        } else {
          Helpers.log(`Database initialized, loading ${Constants.DATABASE_FILE}`, 'G');
          resolve();
        }
      });
    });
  }

  close () {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          Helpers.log(`Error closing db: ${err.message}`, 'R');
        } else {
          Helpers.log('Safely closed db connection', 'G');
        }
      })
    }
  }

  serialize () {
    Helpers.log('Creating schema', 'C');
    Serialize.createSchema(this.db);
  }

  populateDummyData () {
    Helpers.log('Populating dummy data', 'C');
    Serialize.populateDummyData(this.db);
  }

  testGetUsers () {
    return new Promise((resolve, reject) => {
      Helpers.log('Running test get users query', 'C');
      this.db.all('SELECT id, name FROM users', (err, rows) => {
        if (err) {
          Helpers.log(`Query error: ${err.message}`, 'R');
          reject(err.message);
        } else {
          resolve(rows);
        }
      })
    });
  }
}



module.exports = {
  Database
};
