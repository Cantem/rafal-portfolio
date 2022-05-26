import mongoose from "mongoose";
import { mongoDbConfig } from "../config/dev.js";
import "./models/portfolio.js";
import "./models/user.js";

export const connectDb = async () => {
  try {
    await mongoose.connect(mongoDbConfig.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connected to DB");
  } catch (e) {
    console.log("Error occured while connecting to MongoDB", e);
  }
};
