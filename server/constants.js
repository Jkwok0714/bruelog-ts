const local = true;

const DATABASE_FILE = './simcoe.db';
const PORT_NUMBER = 3003;

const SERVER_URL = local ? `127.0.0.1:${PORT_NUMBER}` : '';

const MAX_FILESIZE = 10 * 1024 * 1024;

module.exports = {
  DATABASE_FILE,
  PORT_NUMBER,
  SERVER_URL,
  MAX_FILESIZE,
};
