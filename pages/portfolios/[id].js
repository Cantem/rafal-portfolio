const PortfolioDetails = ({ query }) => {
  const { id } = query;
  return <h1>Details Page ID: {id} </h1>;
};

PortfolioDetails.getInitialProps = ({ query }) => {
  return { query };
};

export default PortfolioDetails;
