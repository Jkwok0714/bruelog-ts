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

module.exports = {
  log
};
