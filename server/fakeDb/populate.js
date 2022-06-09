import mongoose from "mongoose";
import { mongoDbConfig } from "../config/dev.js";
import FakeDb from "./FakeDb.js";

const fakeDb = new FakeDb();

export const populateDb = async () => {
  try {
    await mongoose.connect(mongoDbConfig.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Starting populating DB...");
    await fakeDb.populate();
    await mongoose.connection.close();
    console.log("DB has been populated...");
  } catch (e) {
    console.log("Error occured while populating data to MongoDB", e);
  }
};
