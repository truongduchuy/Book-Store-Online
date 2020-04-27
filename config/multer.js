const multer = require('multer');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/jpe|jpeg|png|jpg|gif$i/))
      callback(new Error('Please choose an image file'));
    callback(undefined, true);
  },
});
