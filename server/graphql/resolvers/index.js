const Portfolio = require("../../db/models/portfolio");

exports.portfolioQueries = {
  portfolio: (root, { id }) => {
    return Portfolio.findById(id);
  },
  portfolios: () => {
    return Portfolio.find({});
  },
};

exports.portfolioMutations = {
  createPortfolio: async (root, { input }) => {
    const createdPortfolio = await Portfolio.create(input);
    return createdPortfolio;
  },
  updatePortfolio: async (root, { id, input }) => {
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { _id: id },
      input,
      { new: true }
    );
    return updatedPortfolio;
  },
  deletePortfolio: async (root, { id }) => {
    const deletedPortfolio = await Portfolio.findOneAndRemove({ _id: id });
    return deletedPortfolio._id;
  },
};
