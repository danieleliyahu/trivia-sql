const { hashSync, compare } = require("bcrypt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User, Refresh_token ,UserScore} = require("../models");
const { Op } = require("sequelize");
const users = Router();
require("dotenv").config();
const { validateToken } = require("../middlewares");

users.post("/register", async (req, res) => {
  const { email, userName, password } = req.body;

  let checkUser = await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { user_name: userName }],
    },
  });
  console.log(checkUser);
  if (checkUser) {
    return res.status(409).send("user already exists");
  }

  const hashedPassword = hashSync(password, 10);
  const addUserToDB = await User.create({
    email,
    userName,
    password: hashedPassword,
    created_at: Date.now(),
    updated_at: Date.now(),
  });
  res.status(201).send("Register Success");
});

users.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email: email },
  });

  if (!user) {
    return res.status(404).send("User or Password incorrect");
  }

  try {
    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).send("User or Password incorrect");
    }
    const dataInToken = {
      userName: user.userName,
      email: user.email,
    };
    const refreshToken = jwt.sign(
      dataInToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const accessToken = jwt.sign(dataInToken, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });

    const addRefreshTokenToDB = await Refresh_token.create({
      refresh_token: refreshToken,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    console.log(accessToken,"sssssssssssssssssssssssssssssssssss")
    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
users.post("/tokenValidate", validateToken, (req, res) => {
  res.json({ valid: true ,info:req.user});
});
users.post("/token", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).send("Refresh Token Required");
  }
  const RefreshToken = await Refresh_token.findOne({
    where: { Refresh_token: token },
  });
  if (!RefreshToken) {
    return res.status(403).send("Invalid Refresh Token");
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async(err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid Refresh Token");
    }
    const userInfo = await UserScore.findAll({
      where: {email:decoded.email}
    })
    const { userName, email } = decoded;
    const accessToken = jwt.sign(
      { userName, email,userInfo },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10s",
      }
    );

    return res.json({ accessToken });
  });
});

module.exports = users;
