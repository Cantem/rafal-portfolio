import RegisterForm from "../components/forms/RegisterForm.js";
import { useSignUp } from "apollo/actions/index.js";
import withApollo from "hoc/withApollo.js";
import Redirect from "components/shared/Redirect.js";
import BaseLayout from "layouts/BaseLayout.js";

const Register = () => {
  const [signUp, { data, error }] = useSignUp();
  const errorMessage = (error) => {
    return error.message || "Ooooops something went wrong...";
  };

  const handleOnSubmit = async (signUpData) => {
    try {
      await signUp({ variables: signUpData });
    } catch (e) {
      throw e;
    }
  };

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Register</h1>
            <RegisterForm
              onSubmit={(singUpData) => handleOnSubmit(singUpData)}
            />
            {data && data.signUp && (
              <Redirect to="/login" query={{ message: "LOGGED_IN" }} />
            )}
            {error && (
              <div className="alert alert-danger">{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Register);
