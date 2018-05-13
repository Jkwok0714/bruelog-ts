const UsersTableName = 'users';
const Helpers = require('../helpers.js');

/**
 * @module server/userHandler
 */

/**
 * Handle logging in a user, check passcode
 * Requires body params {@link handleLogin-requestBody}
 * @function
 */
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

/**
 * Handle signing up a user
 * Requires body params {@link handleSignup-requestBody}
 * @function
 */
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

/**
 * @typedef module:userHandler~handleLogin-requestBody
 * @property {string} username Login user's username
 * @property {string} passcode Login user's passcode
 */

 /**
  * @typedef module:userHandler~handleSignup-requestBody
  * @property {string} username Login user's username
  * @property {string} passcode Login user's passcode
  */
