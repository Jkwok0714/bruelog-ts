const UsersTableName = 'users';

const handleLogin = (req, res, db) => {
  res.status(200).send('Cool');
};

const handleSignup = (req, res, db) => {
  res.status(200).send('Cooler');
};

module.exports = {
  handleLogin,
  handleSignup
};
