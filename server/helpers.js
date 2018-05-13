/**
 * @module server/helpers
 */

 /**
  *
  * @function
  * @param {string} message The log to print out
  * @param {string} [color='x1b[37m'] Color to print the log with
  */
const log = (message, color) => {
  let colorCode = '\x1b[37m';

  switch (color) {
    case 'Y':
      colorCode = '\x1b[33m';
      break;
    case 'G':
      colorCode = '\x1b[32m';
      break;
    case 'R':
      colorCode = '\x1b[31m';
      break;
    case 'C':
      colorCode = '\x1b[36m';
      break;
    default:
    break;
  }

  let d = new Date().toISOString();

  console.log(colorCode, `[${d}] - `, message, '\x1b[0m');
};

/**
 * Constructs a random string token for use with unique IDs/names
 * @function
 * @returns {string} Random token of length 15
 */
const token = () => {
  let rndString = '';
	const stringLength = 15;
	let stringArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i',
    'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F',
    'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

	for (var i = 1; i < stringLength; i++) {
		var rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
		rndString = rndString + stringArray[rndNum];
	};

  return rndString;
}

/**
 * Get the extension from a file name
 * @param {string} filename The filename to get the extension from
 */
const getExtension = (filename) => {
  let split = filename.split('.');
  return split[split.length - 1];
}

module.exports = {
  getExtension,
  log,
  token
};
