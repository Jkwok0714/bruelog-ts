const Database = require('./database.js').Database;
const db = new Database();

console.log('Initializing database');

try {
  db.serialize();
} catch (e) {
  console.log('Error serializing:', e.message);
}
