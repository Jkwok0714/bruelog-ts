const Database = require('./database.js').Database;
const db = new Database();

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
