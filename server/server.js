const express = require("express");
const cors = require("cors");
const Router = require("./router/index");
require("dotenv").config();
require("./Model/connection");

PORT = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/user", Router);
// app.post("/api/register", Router);

app.listen(PORT, () => {
  console.log(`THE APP IS RUNNING ON ${PORT}`);
});
