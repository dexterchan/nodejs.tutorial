const config = require("config");
const jwt = require("jsonwebtoken");

const JWT_PRIVATE_KEY = config.get("JWT_PRIVATE_KEY");

console.log(JWT_PRIVATE_KEY);

const userInfo = {
  name: "app_user",
  role: "user",
};

const token = jwt.sign(userInfo, JWT_PRIVATE_KEY, {
  algorithm: "HS256",
  expiresIn: "30d",
});

console.log(token);
const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
console.log(decoded);
console.log("expire:" + new Date(decoded.exp * 1000));
