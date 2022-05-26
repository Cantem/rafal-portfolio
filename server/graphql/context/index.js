const authenticateUser = ({ email, password }) => {
  console.log(`Authenticating user: ${email}`);
  return true;
};

export const buildAuthContext = () => {
  const auth = {
    authenticate: (options) => authenticateUser(options),
  };

  return auth;
};
