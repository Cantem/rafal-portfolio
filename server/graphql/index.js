import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
import {
  portfolioQueries,
  portfolioMutations,
  userMutations,
} from "./resolvers/index.js";
import { portfolioTypes, userTypes } from "./types/index.js";
import { Portfolio } from "./models/Portfolio.js";
import { User } from "./models/User.js";
import { buildAuthContext } from "./context/index.js";

export const createApolloServer = () => {
  // Construct a schema, using GRAPHQL schema language
  const typeDefs = gql(`
    ${portfolioTypes}
    ${userTypes}
  type Query {
    portfolio(id: ID): Portfolio
    portfolios: [Portfolio]
  }
  type Mutation {
    createPortfolio(input: PortfolioInput): Portfolio
    updatePortfolio(id: ID, input: PortfolioInput): Portfolio
    deletePortfolio(id: ID): ID
    signIn(input: SignInInput): User
    signUp(input: SignUpInput): String
    signOut: String
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
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        Portfolio: new Portfolio(mongoose.model("Portfolio")),
        User: new User(mongoose.model("User")),
      },
    }),
  });

  return apolloServer;
};