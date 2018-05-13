/**
 * @module server/databaseSerializer
 */

/**
 * Create schema for SQLite db
 * @function
 * @param {Object} db Requires a database connection to run on
 */
const createSchema = (db) => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id integer PRIMARY KEY, username text UNIQUE, passcode text, image text)');
    db.run('CREATE TABLE IF NOT EXISTS series (id integer PRIMARY KEY, userid number, name text, image text, description text)');

    db.run('CREATE TABLE IF NOT EXISTS hops (id integer PRIMARY KEY, userid number, name text, flavors text, description text)');
    db.run('CREATE TABLE IF NOT EXISTS malts (id integer PRIMARY KEY, userid number, name text, flavors text, description text)');
    db.run('CREATE TABLE IF NOT EXISTS yeast (id integer PRIMARY KEY, userid number, name text, flavors text, description text)');
    db.run('CREATE TABLE IF NOT EXISTS other (id integer PRIMARY KEY, userid number, name text, flavors text, description text)');

    db.run('CREATE TABLE IF NOT EXISTS attachments (id integer PRIMARY KEY, brewid number, image text)');
    db.run('CREATE TABLE IF NOT EXISTS recipes (id integer PRIMARY KEY, userid number, ingredients text)');

    db.run(`CREATE TABLE IF NOT EXISTS brewsteps
      (id integer PRIMARY KEY, brewid number, type text, amount text, gravity number, temperature text, time text)`);
    db.run(`CREATE TABLE IF NOT EXISTS brew
      (id integer PRIMARY KEY, userid number, name text, style text, image text, description text, brewdate text, bottledate text,
      mash text, boil text, fermentation text, lageringtemp text, length text, bottling text, tastingnote text, archived number,
      recipeid number, attachments text, notes text, seriesid number)`);
  });
};

/**
 * Fill in some sample data for test purposes, mostly used for set-up, potentially will be used for starter dictionary data
 * @function
 * @param {Object} db Requires a database connection to run on
 */
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
