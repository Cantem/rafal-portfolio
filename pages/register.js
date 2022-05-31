import RegisterForm from "../components/forms/RegisterForm.js";
import { Mutation } from "@apollo/react-components";
import { SIGN_UP } from "apollo/queries/index.js";
import withApollo from "hoc/withApollo.js";
import Redirect from "components/shared/Redirect.js";

const Register = () => {
  // TODO: Handle DB Errors!
  const errorMessage = (error) => {
    return error.message || "Ooooops something went wrong...";
  };

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Register</h1>
            <Mutation mutation={SIGN_UP}>
              {(signUpUser, { data, error }) => (
                <>
                  <RegisterForm
                    onSubmit={(registerData) => {
                      signUpUser({ variables: registerData });
                    }}
                  />
                  {data && data.signUp && <Redirect to="/login" />}
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

export default withApollo(Register);
