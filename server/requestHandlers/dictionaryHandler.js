const Helpers = require('../helpers.js');

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

const handleUpdateEntry = (req, res, db) => {
  console.log(req.body);
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
    res.status(200).send(dataPackage);
  }).catch(err => {
    res.status(500).send(`Error occured: ${err.message}`);
  })
};

module.exports = {
  handleAddEntry,
  handleUpdateEntry,
  getUserDictionaries
};
