const createSchema = (db) => {
  db.serialize(() => {
    db.run('CREATE TABLE users (id integer PRIMARY KEY, username text UNIQUE, passcode text, image text)');
  });
};

const populateDummyData = (db) => {
  try {
    let stmt = db.prepare('INSERT INTO users VALUES(?, ?, ?)');
    stmt.run(null, 'Niilo Sevanenen', '123');
    stmt.finalize();
  } catch (e) {
    this.createSchema(db);
  }
};

module.exports = {
  createSchema,
  populateDummyData
};
