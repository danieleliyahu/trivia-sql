const { hashSync, compare } = require("bcrypt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User, Refresh_token } = require("../models");
const users = Router();
require("dotenv").config();

users.post("/register", async (req, res) => {
  const { email, userName, password } = req.body;

  let checkUser = await User.findOne({
    where: { email: email },
  }); 
  console.log(checkUser)
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

    res.json({
      accessToken,
      refreshToken,
      ...dataInToken,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = users;
