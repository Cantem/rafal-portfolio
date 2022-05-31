import RegisterForm from "../components/forms/RegisterForm.js";
import { Mutation } from "@apollo/react-components";
import { SIGN_UP } from "apollo/queries/index.js";
import withApollo from "hoc/withApollo.js";

const Register = () => {
  const register = (registerData) => {
    alert(JSON.stringify(registerData));
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
