import mongoose from "mongoose";
import { mongoDbConfig } from "../config/dev.js";
import "./models/portfolio.js";

export const connectDb = async () => {
  try {
    await mongoose.connect(mongoDbConfig.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to DB");
  } catch (e) {
    console.log("Error occured while connecting to MongoDB", e);
  }
};
