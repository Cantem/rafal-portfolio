import passport from "passport";

// options == {email, password}
const authenticateUser = (options) => {
  return new Promise((resolve, reject) => {
    const done = (error, user) => {
      if (error) {
        return reject(new Error(error));
      }

      if (user) {
        return resolve(user);
      } else {
        return reject(new Error("Invalid password or email!"));
      }
    };

    const authFn = passport.authenticate("graphql", {}, done);
    authFn(options);
  });
};

export const buildAuthContext = () => {
  const auth = {
    authenticate: (options) => authenticateUser(options),
  };

  return auth;
};
