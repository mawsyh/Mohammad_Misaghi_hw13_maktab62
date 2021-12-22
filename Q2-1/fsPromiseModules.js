// Include fs module
const fs = require("fs");
//including path module
const path = require("path");

//making a function to check availability
function accessPromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.access(path.join(__dirname, fileName), (err) => {
      if (err) reject(`Error while trying to access ${fileName}`);
      else resolve(`File in access`);
    });
  });
}

//making a function to read the fileName
function readFilePromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) reject(`Error while reading ${fileName}`);
      else resolve(data);
    });
  });
}

module.exports = {
  accessPromise,
  readFilePromise,
};
