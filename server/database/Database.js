const sqlite = require('sqlite3');

const Constants = require('../constants.js');
const Helpers = require('../helpers.js');
const Serialize = require('./database-serialize.js');

/**
 * Database handler class that runs queries. One is instantiated with server to handle the DB connection.
 * Currently takes in row queries to run, and methods are somewhat redundant
 * @todo Potentially refactor into more useful ORM-like methods
 * @class
 */
class Database {
  constructor () {
    this.db = null;
  }

  /**
   * Create the database connection
   * @function
   */
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

  /**
   * Close the database connection. When is this used?!?!
   * @function
   */
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

  /**
   * Handle writing to the database. Used when the ID is needed in response
   * @function
   * @param {string} query SQL query to run
   * @param {Array} data Data for SQL query
   * @returns {number} ID of the newly inserted element
   */
  write (query, data) {
    return new Promise((resolve, reject) => {
      Helpers.log(`W-QUERY: ${query}`, 'C');
      this.db.run(query, data, function (err) {
        if (err) {
          reject(err);
        } else {
          // console.log(this.lastID);
          resolve(this.lastID);
        }
      });
    });
  }

  /**
   * Handle reading from the database.
   * @function
   * @param {string} query SQL query to run
   * @param {Array} data Data for SQL query
   * @returns {Object|Array} Queried-for data
   */
  read (query, data) {
    return new Promise((resolve, reject) => {
      Helpers.log(`R-QUERY: ${query}`, 'C');
      this.db.all(query, data, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * Handle deleting from the database.
   * @function
   * @param {string} query SQL query to run
   * @param {Array} data Data for SQL query
   * @returns {number} ID of the newly inserted element
   */
  delete (query, data) {
    return new Promise((resolve, reject) => {
      Helpers.log(`D-QUERY: ${query}`, 'C');
      console.log(data);
      this.db.run(query, data, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  /**
   * Serialize the database using DatabaseSerializer module.
   * @function
   * @requires ./database-serializer.js
   */
  serialize () {
    Helpers.log('Creating schema', 'C');
    Serialize.createSchema(this.db);
  }

  /**
   * Dummy data maker
   * @function
   */
  populateDummyData () {
    Helpers.log('Populating dummy data', 'C');
    Serialize.populateDummyData(this.db);
  }

  /**
   * Used for initial testing to query db
   * @function
   */
  testGetUsers () {
    return new Promise((resolve, reject) => {
      Helpers.log('Running test get users query', 'C');
      this.db.all('SELECT * FROM users', (err, rows) => {
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
