const local = true;

const DATABASE_FILE = './simcoe.db';
const PORT_NUMBER = 8000;

const SERVER_URL = local ? `127.0.0.1:${PORT_NUMBER}` : '';

module.exports = {
  DATABASE_FILE,
  PORT_NUMBER,
  SERVER_URL
};
