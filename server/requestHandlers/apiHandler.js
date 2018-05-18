const Helpers = require('../helpers.js');

/**
 * @module server/apiHandler
 */

const apiGet = (req, res, db) => {
  const body = req.body;
  const userID = req.get('userID');
  db.read(`SELECT * FROM ${req.params.category} WHERE userid=? OR userid=?`, [userID, 0]).then(data => {
    console.log(data);
    let parsedData = Helpers.prepareForClient(data);
    res.status(200).send(Helpers.convertArrayToDataObject(parsedData));
  }).catch(err => {
    Helpers.log(err.message, 'R');
    res.status(500).send(`Error occured: ${err.message}`);
  });
};

const apiPost = (req, res, db) => {
  const body = req.body;
  const userID = req.get('userID');
  const queryConstructor = Helpers.constructQuery(body, false, userID);
  console.log(queryConstructor.data);
  db.write(`INSERT INTO ${req.params.category} ${queryConstructor.query}`,
    queryConstructor.data).then(data => {
    res.status(200).send({id: data});
  }).catch(err => {
    Helpers.log(err.message, 'R');
    res.status(500).send(`Error occured: ${err.message}`);
  });
};

const apiPut = (req, res, db) => {
  const body = req.body;
  const queryConstructor = Helpers.constructQuery(body, true, null);
  console.log(queryConstructor.data);
  db.write(`UPDATE ${req.params.category} SET ${queryConstructor.query} WHERE id=?`,
    queryConstructor.data).then(data => {
    res.status(200).send({id: body.id});
  }).catch(err => {
    Helpers.log(err.message, 'R');
    res.status(500).send(`Error occured: ${err.message}`);
  });
};

const apiDelete = (req, res, db) => {
  const body = req.body;
  db.delete(`DELETE FROM ${req.params.category} WHERE id=?`, body.id).then(data => {
    res.status(200).send({data});
  }).catch(err => {
    Helpers.log(err.message, 'R');
    res.status(500).send(`Error occured: ${err.message}`);
  });
};

module.exports = {
 apiGet,
 apiPost,
 apiPut,
 apiDelete
};
