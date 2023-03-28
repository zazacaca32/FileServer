const util = require("util");
const path = require("path");
const multer = require("multer");

const directoryPath = `${__dirname}/../../upload`;

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(directoryPath));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "video/mp4"];

console.log(file.mimetype);
    if (match.indexOf(file.mimetype) === -1) {
      var message = `<strong>${file.originalname}</strong> is invalid. Only accept ${JSON.stringify(match)}.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
});

var uploadFiles = multer({ storage: storage }).array("multi-files", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;