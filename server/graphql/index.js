import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
import { portfolioQueries, portfolioMutations } from "./resolvers/index.js";
import { portfolioTypes } from "./types/index.js";
import { Portfolio } from "./models/Portfolio.js";

export const createApolloServer = () => {
  // Construct a schema, using GRAPHQL schema language
  const typeDefs = gql(`
  ${portfolioTypes}
  type Query {
    portfolio(id: ID): Portfolio
    portfolios: [Portfolio]
  }
  type Mutation {
    createPortfolio(input: PortfolioInput): Portfolio
    updatePortfolio(id: ID, input: PortfolioInput): Portfolio
    deletePortfolio(id: ID): ID
  }`);

  // The root provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...portfolioQueries,
    },
    Mutation: {
      ...portfolioMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: {
        Portfolio: new Portfolio(mongoose.model("Portfolio")),
      },
    }),
  });

  return apolloServer;
};
