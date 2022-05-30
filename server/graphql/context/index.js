import passport from "passport";

// options == {email, password}
const authenticateUser = (req, options) => {
  return new Promise((resolve, reject) => {
    const done = (error, user) => {
      if (error) {
        return reject(new Error(error));
      }

      if (user) {
        req.login(user, (error) => {
          if (error) {
            return reject(new Error(error));
          }
          return resolve(user);
        });
      } else {
        return reject(new Error("Invalid password or email!"));
      }
    };

    const authFn = passport.authenticate("graphql", {}, done);
    authFn(options);
  });
};

export const buildAuthContext = (req, next) => {
  const auth = {
    authenticate: (options) => authenticateUser(req, options),
    logout: () =>
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
      }),
  };

  return auth;
};
