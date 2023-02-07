const mongoose = require("mongoose");

const connection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/ag");
    console.log("THE CONNECTION IS established");
  } catch (err) {
    console.log(err);
  }
};

connection();

module.exports = connection;
