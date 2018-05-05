const fs = require('fs');

const assignImage = (imageName, user, filePath, db) => {
    let oldImage = null;
    // console.log(`Update image to ${imageName} for ${user}`);
    return new Promise ((resolve, reject) => {
      db.read(`SELECT image FROM users WHERE username=?`, [user]).then(res => {
        oldImage = res[0].image;
        return db.write('UPDATE users SET image=? WHERE username=?', [imageName, user]);
      }).then(res => {
        if (oldImage && oldImage !== '') {
          fs.unlink(`${filePath}/${oldImage}`, () => {});
        }
        resolve();
      }).catch(err => {
        reject(err.message);
      });
    });
}

module.exports = {
  assignImage
};
