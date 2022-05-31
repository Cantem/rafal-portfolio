import LoginForm from "components/forms/LoginForm";
import withApollo from "hoc/withApollo";
import { Mutation } from "@apollo/react-components";
import { SIGN_IN } from "apollo/queries/index.js";
import Redirect from "components/shared/Redirect.js";

const Login = () => {
  const errorMessage = (error) => {
    return error.message || "Ooooops something went wrong...";
  };

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            <Mutation
              mutation={SIGN_IN}
              // TODO fix workaround for undhandled error thrown in the UI
              onError={() => {}}
            >
              {(signIn, { data, error }) => (
                <>
                  <LoginForm
                    onSubmit={(signInData) => signIn({ variables: signInData })}
                  />
                  {data && data.signIn && <Redirect to="/" />}
                  {error && (
                    <div className="alert alert-danger">
                      {errorMessage(error)}
                    </div>
                  )}
                </>
              )}
            </Mutation>
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo(Login);
