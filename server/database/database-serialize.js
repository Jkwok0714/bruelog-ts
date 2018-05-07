const createSchema = (db) => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id integer PRIMARY KEY, username text UNIQUE, passcode text, image text)');
    db.run('CREATE TABLE IF NOT EXISTS hops (id integer PRIMARY KEY, userid number, name text, flavors text, description text)');
    db.run('CREATE TABLE IF NOT EXISTS malts (id integer PRIMARY KEY, userid number, name text, flavors text, description text)');
    db.run('CREATE TABLE IF NOT EXISTS yeast (id integer PRIMARY KEY, userid number, name text, flavors text, description text)');
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
