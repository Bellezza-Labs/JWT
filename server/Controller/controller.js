const PersonUser = require("../Model/personModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { response } = require("express");
module.exports = {
  home: (req, res) => {
    res.send("HEY THIS IS THE HOME PAGE");
  },
  getUser: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await PersonUser.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ error: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await PersonUser.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      res.send({ message: "User created successfully", user });
    } catch (error) {
      res.status(500).send({ error: "Error creating user" });
    }
  },

  findUser: async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const user = await PersonUser.findOne({
      name: name,
      email: email,
    });

    console.log(user);

    if (!user) {
      res.send({ status: "error", message: "INVALID USER" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ name, email }, process.env.SECRET_KEY);
      res.send({
        status: "OK",
        message: "THE USER IS LOGGED IN ",
        token: token,
      });
    } else {
      res.send({
        status: "error",
        message: "PASSWORD INVALID",
      });
    }
  },

  getQuote: async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const email = decoded.email;
      const user = await PersonUser.findOne({ email: email });
      res.json({
        status: "OK",
        quote: user.name,
      });
    } catch (err) {
      console.log(err);
      res.json({
        status: "err",
        message: "Invalid Token",
      });
    }
  },
};
