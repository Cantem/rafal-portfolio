const mongoose = require("mongoose");
const config = require("../config/dev");

require("./models/portfolio");

const connectDb = async () => {
  try {
    await mongoose.connect(config.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (e) {
    console.log("Error occured while connecting to MongoDB", e);
  }
};
module.exports = { connectDb };
