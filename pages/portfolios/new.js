import { useState } from "react";
import { useRouter } from "next/router";
import PortfolioForm from "components/forms/PortfolioForm";
import withApollo from "hoc/withApollo";
import withAuth from "hoc/withAuth";
import { useCreatePortfolio } from "apollo/actions";
import BaseLayout from "layouts/BaseLayout";

const PortfolioNew = () => {
  const [createPortfolio] = useCreatePortfolio();
  const [err, setError] = useState();
  const router = useRouter();

  const errorMessage = (error) => {
    return error.message || "Ooooops something went wrong...";
  };

  const handleCreatePortfolio = async (data) => {
    try {
      const result = await createPortfolio({ variables: data });
      if (result.data) {
        router.push("/portfolios");
      }
      if (result.errors) {
        setError(result.errors);
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Create New Portfolio</h1>
            <PortfolioForm onSubmit={handleCreatePortfolio} />
            {err && (
              <div className="alert alert-danger">{errorMessage(err)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(withAuth(PortfolioNew, ["admin", "instructor"]));
