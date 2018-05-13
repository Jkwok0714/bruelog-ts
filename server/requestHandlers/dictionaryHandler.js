const Helpers = require('../helpers.js');

/**
 * @module server/dictionaryHandler
 */

/**
 * Handle adding a new dictionary item
 * Requires body params {@link handleAddEntry-requestBody}
 * @function
 * @todo In the future, these can be put together into an API handler route
 */
const handleAddEntry = (req, res, db) => {
  console.log(req.body);
  const body = req.body;
  const userID = req.get('userID');
  db.write(`INSERT INTO ${body.type}(userid, name, flavors, description) VALUES(?, ?, ?, ?)`,
    [userID, body.name, body.flavors, body.description]).then(data => {
    // const user = data[0];
    // console.log(data);
    res.status(200).send({id: data});
  }).catch(err => {
    Helpers.log(err.message, 'R');
    res.status(500).send(`Error occured: ${err.message}`);
  });
};

/**
 * Handle updating a dictionary item
 * Requires body params {@link handleUpdateEntry-requestBody}
 * @function
 * @todo In the future, these can be put together into an API handler route
 */
const handleUpdateEntry = (req, res, db) => {
  const body = req.body;
  db.write(`UPDATE ${body.type} SET name=?, flavors=?, description=? WHERE id=?`,
    [body.name, body.flavors, body.description, body.id]).then(data => {
    // const user = data[0];
    res.status(200).send({id: body.id});
  }).catch(err => {
    Helpers.log(err.message, 'R');
    res.status(500).send(`Error occured: ${err.message}`);
  });
};

/**
 * Handle deleting a dictionary item
 * Requires body params {@link handleDeleteEntry-requestBody}
 * @function
 * @todo In the future, these can be put together into an API handler route
 */
const handleDeleteEntry = (req, res, db) => {
  const body = req.body;
  db.delete(`DELETE FROM ${body.type} WHERE id=?`, body.id).then(data => {
    res.status(200).send({data});
  }).catch(err => {
    Helpers.log(err.message, 'R');
    res.status(500).send(`Error occured: ${err.message}`);
  });
}

/**
 * Handle retrieving all of a user's dictionaries for use
 * @function
 * @todo In the future, these can be put together into an API handler route
 */
const getUserDictionaries = (req, res, db) => {
  let dataPackage = {};
  const userID = req.get('userID');
  console.log('looking for user', userID);
  db.read('SELECT * FROM hops WHERE userid=? OR userid=?', [userID, 0]).then(data => {
    dataPackage.hops = data;
    return db.read('SELECT * FROM malts WHERE userid=? OR userid=?', [userID, 0]);
  }).then(data => {
    dataPackage.malts = data;
    return db.read('SELECT * FROM yeast WHERE userid=? OR userid=?', [userID, 0]);
  }).then(data => {
    dataPackage.yeast = data;
    return db.read('SELECT * FROM other WHERE userid=? OR userid=?', [userID, 0]);
  }).then(data => {
    dataPackage.other = data;
    res.status(200).send(dataPackage);
  }).catch(err => {
    res.status(500).send(`Error occured: ${err.message}`);
  })
};

module.exports = {
  handleAddEntry,
  handleUpdateEntry,
  handleDeleteEntry,
  getUserDictionaries
};

/**
 * @typedef module:dictionaryHandler~handleAddEntry-requestBody
 * @property {string} name Name of the dictionary item to be added
 * @property {string} flavors Flavors field of dictionary item to be added
 * @property {string} description Description field to be added
 */

/**
 * @typedef module:dictionaryHandler~handleUpdateEntry-requestBody
 * @property {string} name Name of the dictionary item to be added
 * @property {string} flavors Flavors field of dictionary item to be added
 * @property {string} description Description field to be added
 * @property {number} id ID of the element being modified
 */

/**
 * @typedef module:dictionaryHandler~handleDeleteEntry-requestBody
 * @property {number} id ID of the element being deleted
 */
