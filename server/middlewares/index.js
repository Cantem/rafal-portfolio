import session from "express-session";
import { mongoDbConfig } from "../config/dev.js";
import { initSessionStore } from "../db/index.js";
import { initializePassport } from "./passport/index.js";
import passport from "passport";

const TWO_HOURS = 2 * 60 * 60 * 1000;

export const initializeSession = (server) => {
  initializePassport(passport);

  const sessionObj = {
    name: "portfolio-session",
    secret: mongoDbConfig.SESSION_SECRET,
    cookie: { maxAge: TWO_HOURS },
    resave: false,
    saveUninitialized: false,
    store: initSessionStore(),
  };

  server.use(session(sessionObj));
  server.use(passport.initialize());
};
