const mongoose = require("mongoose");
const config = require("../config/dev");
const fakeDb = require("./FakeDb");

const populateDb = async () => {
  try {
    await mongoose.connect(config.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Starting populating DB...");
    await fakeDb.populate();
    await mongoose.connection.close();
    console.log("DB has been populated...");
  } catch (e) {
    console.log("Error occured while populating data to MongoDB", e);
  }
};
populateDb();
