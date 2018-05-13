const Database = require('./database.js').Database;
const db = new Database();

/**
 * Stuff and things file header
 * @file Used to initiate a fresh db or something like that
 * @author Harkoum
 */

console.log('Initializing database');

db.initialize().then(() => {
  try {
    db.serialize();
  } catch (e) {
    console.log('Error serializing:', e.message);
  }
}).catch(err => {
  console.log(`Error starting db: ${err}`);
});
