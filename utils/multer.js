'use strict';
let multer = require('multer'),
  crypto = require('crypto'),
  path = require('path');

let userUpload = multer({
  dest: 'uploads/user',
  fileFilter: function (req, file, cb) {
    console.log(file.mimetype);

    if (file.mimetype != 'image/jpeg' && file.mimetype != 'image/png') {
      return cb(new Error('Only JPG and PNG allowed'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 8 * 1024 * 1024
  }
})

module.exports = {
  userUpload
}
