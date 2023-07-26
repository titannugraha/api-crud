const multer = require("multer");
const path = require("path");

module.exports = (type) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, type + "-" + uniqueSuffix + path.extname(file.originalname));
    },
  });
  return multer({ storage: storage });
};
