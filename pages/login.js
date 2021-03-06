import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import LoginForm from "components/forms/LoginForm";
import withApollo from "hoc/withApollo";
import { useSignIn } from "apollo/actions";
import Redirect from "components/shared/Redirect.js";
import BaseLayout from "layouts/BaseLayout";
import messages from "utils/constants";

const Login = () => {
  const disposeId = useRef(null);
  const [signIn, { data, error, loading }] = useSignIn();
  const router = useRouter();
  const { message } = router.query;

  const disposeMessage = () => {
    router.replace("/login", "/login", { shallow: true });
  };

  useEffect(() => {
    if (message) {
      disposeId.current = setTimeout(() => {
        disposeMessage();
      }, 3000);
    }

    return () => {
      clearTimeout(disposeId.current);
    };
  }, [message]);

  const errorMessage = (error) => {
    return error.message || "Ooooops something went wrong...";
  };

  const handleOnSubmit = async (signInData) => {
    try {
      await signIn({ variables: signInData });
    } catch (e) {
      throw e;
    }
  };

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            {message && (
              <div className={`alert alert-${messages[message].status}`}>
                {messages[message].value}
              </div>
            )}
            <LoginForm
              loading={loading}
              onSubmit={(signInData) => handleOnSubmit(signInData)}
            />
            {data && data.signIn && <Redirect to="/" />}
            {error && (
              <div className="alert alert-danger">{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Login);
