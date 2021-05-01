const jwt = require("jsonwebtoken");
const {
  UserScore
} = require("../models");
require("dotenv").config();
function validateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader;
    console.log(authHeader)
    if (!token) {
      return res.status(401).send("Access Token Required");
    }
    console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(403).send("Invalid Access Token");
      }

      req.user = decoded;
      next();
    });
  }
  
  module.exports = { validateToken };