/**
 * @module server/helpers
 */

 /**
  * Logging function
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
 * @yields {string} Random token of length 15
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
 * @function
 * @param {string} filename The filename to get the extension from
 */
const getExtension = (filename) => {
  let split = filename.split('.');
  return split[split.length - 1];
}

/**
 *  Convert arrays pulled from SQL into objects to help access speeds and ease
 * @function
 * @param {Array} array An input of data pulled from SQL
 * @returns {object} Object form where the key is the id and the value is the original object in the SQL return
 */
const convertArrayToDataObject = (array) => {
  let result = {};
  for (let i = 0; i < array.length; i++) {
    result[array[i].id] = array[i];
  }
  return result;
}

/**
 * Construct the data and string needed to run a sql query based on sent data
 * @function
 * @param {object} requestBody The body of the api request passed in raw
 * @param {boolean} isUpdate Determines what kind of sql query will be constructed
 * @param {number} [userID=null] If userID needs to be written into the db, include it.
 * @returns {object} Contains query and data to be used with sql call
 */
const constructQuery = (requestBody, isUpdate, userID = null) => {
  let queryString = [];
  let queryData = [];
  let finalString;

  if (userID) {
    queryString.push(isUpdate ? `userid=?` : 'userid');
    queryData.push(userID);
  }

  for (let key in requestBody) {
    queryString.push(isUpdate ? `${key.toLowerCase()}=?` : key.toLowerCase());
    queryData.push(requestBody[key] || 1);
  }

  if (!isUpdate) {
    const valuesFill = Array(queryString.length).fill('?').join(', ');
    finalString = `(${queryString.join(', ')}) VALUES(${valuesFill})`;
  } else {
    finalString = `${queryString.join(', ')}`;
    queryData.push(requestBody.id);
  }

  return {
    query: finalString,
    data: queryData
  };
}

module.exports = {
  getExtension,
  convertArrayToDataObject,
  log,
  token,
  constructQuery
};
