const jwt = require("jsonwebtoken");

require("dotenv").config();
const secretKey = process.env.SECRET_KEY || "RAHASIA";

const generateToken = (data) => {
  const { id, username, role } = data;
  return jwt.sign({ id, username, role }, secretKey);
};

const verifyToken = (data) => {
  return jwt.verify(data, secretKey);
};

module.exports = {
  generateToken,
  verifyToken,
};
