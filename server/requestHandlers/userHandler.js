const UsersTableName = 'users';
const Helpers = require('../helpers.js');

const handleLogin = (req, res, db) => {
  res.status(200).send('Cool');
};

const handleSignup = (req, res, db) => {
  console.log(req.body);
  const body = req.body;
  db.write('INSERT INTO users(username, passcode) VALUES(?, ?)', [body.username, body.passcode]).then(() => {
    res.status(200).send('Account created');
  }).catch(err => {
    res.status(500).send(`Error occured: ${err.message}`);
  });
};

module.exports = {
  handleLogin,
  handleSignup
};
