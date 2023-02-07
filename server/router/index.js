const express = require("express");
const {
  home,
  getUser,
  findUser,
  getQuote,
} = require("../Controller/controller");

const Router = express.Router();

Router.get("/", home);
Router.post("/api/register", getUser);
Router.post("/api/login", findUser);
Router.get("/api/quote", getQuote);
module.exports = Router;
