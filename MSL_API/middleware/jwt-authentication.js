const jwt = require("jsonwebtoken");
const { encrypt, decrypt } = require("../utils/AES-util");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const jwtAuthMiddlerware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ error: "Token not found." });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decryptedToken = decrypt(token);
    const decoded = jwt.verify(decryptedToken, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error : ", error);
    res.status(401).json({ error: "Invalid Token" });
  }
};

const generateToken = (userData) => {
  console.log("Inside generate token-----");
  console.log("Secret Key --> ", secretKey);
  const token = jwt.sign(userData, secretKey, { expiresIn: 3000 });
  const encryptedToken = encrypt(token);
  return encryptedToken;
};

module.exports = {
  jwtAuthMiddlerware,
  generateToken,
};
