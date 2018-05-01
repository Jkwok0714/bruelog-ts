const UsersTableName = 'users';
const Helpers = require('../helpers.js');

const handleLogin = (req, res, db) => {
  console.log(req.body);
  const body = req.body;
  db.read(`SELECT * from ${UsersTableName} WHERE username=?`, [body.username]).then(data => {
    const user = data[0];
    if (user.passcode !== body.passcode) {
      res.status(400).send('Invalid password');
    } else {
      res.status(200).send(user);
    }
  }).catch(err => {
    Helpers.log(err.message, 'R');
    res.status(500).send(`Error occured: ${err.message}`);
  });
};

const handleSignup = (req, res, db) => {
  console.log(req.body);
  const body = req.body;
  db.write(`INSERT INTO ${UsersTableName}(username, passcode) VALUES(?, ?)`, [body.username, body.passcode]).then(() => {
    res.status(200).send('Account created');
  }).catch(err => {
    Helpers.log(err.message, 'R');
    res.status(500).send(`Error occured: ${err.message}`);
  });
};

module.exports = {
  handleLogin,
  handleSignup
};
