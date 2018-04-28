const createSchema = (db) => {
  db.serialize(() => {
    db.run('CREATE TABLE users (id integer PRIMARY KEY, name text, passcode text)');
  });
};

const populateDummyData = (db) => {
  let stmt = db.prepare('INSERT INTO users VALUES(?, ?, ?)');
  stmt.run(null, 'Niilo Sevanenen', '123');
  stmt.finalize();
};

module.exports = {
  createSchema,
  populateDummyData
};
