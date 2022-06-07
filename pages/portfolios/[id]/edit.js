import { useState } from "react";
import { useRouter } from "next/router";
import PortfolioForm from "components/forms/PortfolioForm";
import withApollo from "hoc/withApollo";
import withAuth from "hoc/withAuth";
import BaseLayout from "layouts/BaseLayout";
import { useGetPortfolio, useUpdatePortfolio } from "apollo/actions";

const PortfolioEdit = () => {
  const [err, setError] = useState();
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetPortfolio({ variables: { id } });
  const [updatePortfolio] = useUpdatePortfolio();

  const errorMessage = (error) => {
    return error.message || "Ooooops something went wrong...";
  };

  const handleUpdatePortfolio = async (data) => {
    try {
      const result = await updatePortfolio({ variables: { id, ...data } });
      router.push("/portfolios");
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
            <h1 className="page-title">Edit Portfolio</h1>
            {data && (
              <PortfolioForm
                initialData={data.portfolio}
                onSubmit={handleUpdatePortfolio}
              />
            )}
            {err && (
              <div className="alert alert-danger">{errorMessage(err)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(withAuth(PortfolioEdit, ["admin", "instructor"]));
