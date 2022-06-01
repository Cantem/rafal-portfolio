import { useGetUser } from "apollo/actions";
import Redirect from "components/shared/Redirect.js";

export default (WrappedComponent) => (props) => {
  const {
    data: { user } = {},
    loading,
    error,
  } = useGetUser({ fetchPolicy: "network-only" });

  if (!loading && (!user || error) && typeof window !== "undefined") {
    return <Redirect to="/login" />;
  }

  // TODO: Check for role
  if (user) {
    return <WrappedComponent {...props} />;
  }

  return <p>Authenticating...</p>;
};
