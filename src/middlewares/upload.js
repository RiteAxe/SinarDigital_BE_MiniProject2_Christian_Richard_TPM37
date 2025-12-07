const multer = require("multer");
const { storage, fileFilter } = require("../config/multer.config");

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;
