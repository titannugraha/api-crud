const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRound = +process.env.SALT_ROUND || 8;

const encryptPwd = (data) => {
  return bcrypt.hashSync(String(data), saltRound);
};

const decryptPwd = (data, hashPwd) => {
  return bcrypt.compareSync(String(data), hashPwd);
};

module.exports = {
  encryptPwd,
  decryptPwd,
};
