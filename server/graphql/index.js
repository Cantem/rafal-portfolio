import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
import {
  portfolioQueries,
  portfolioMutations,
  userMutations,
} from "./resolvers/index.js";
import { portfolioTypes } from "./types/index.js";
import { Portfolio } from "./models/Portfolio.js";
import { User } from "./models/User.js";

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
    singIn: String
    singUp: String
    singOut: String
  }`);

  // The root provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...portfolioQueries,
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: {
        Portfolio: new Portfolio(mongoose.model("Portfolio")),
        User: new User(),
      },
    }),
  });

  return apolloServer;
};
