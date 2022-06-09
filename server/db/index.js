import mongoose from "mongoose";
import session from "express-session";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import { mongoDbConfig } from "../config/dev.js";
import "./models/portfolio.js";
import "./models/user.js";
import "./models/forumCategory.js";
import "./models/topic.js";

const MongoDBStore = connectMongoDBSession(session);

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
    console.log("Error occured while connecting to database", e);
  }
};

export const initSessionStore = () => {
  const store = new MongoDBStore({
    uri: mongoDbConfig.DB_URI,
    collection: "portfolioSessions",
  });

  return store;
};
