import { GraphqlStrategy } from "./strategies.js";
import { User } from "../../db/models/user.js";

export const initializePassport = (passport) => {
  passport.use(
    "graphql",
    new GraphqlStrategy(({ email }, done) => {
      User.findOne({ email }, (error, user) => {
        if (error) {
          return done(error);
        }
        if (!user) {
          return done(null, false);
        }

        // TODO: Check user password if its maching password from options
        return done(null, user);
      });
    })
  );
};
