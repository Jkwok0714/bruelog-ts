const sqlite = require('sqlite3');

const Constants = require('./constants.js');
const Helpers = require('./helpers.js');

class Database {
  constructor () {
    this.db = null;
    this.initialize();
  }

  initialize () {
    this.db = new sqlite.Database(Constants.DATABASE_FILE, (err) => {
      if (err) {
        Helpers.log(`Error initializing db: ${e.message}`, 'R');
      } else {
        Helpers.log(`Database initialzed, loading ${Constants.DATABASE_FILE}`, 'G');
      }
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
}



module.exports = {
  Database
};
