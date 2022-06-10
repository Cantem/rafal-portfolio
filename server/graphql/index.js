import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
import {
  portfolioQueries,
  portfolioMutations,
  userMutations,
  userQueries,
  forumQueries,
  forumMutations,
} from "./resolvers/index.js";
import { portfolioTypes, userTypes, forumTypes } from "./types/index.js";
import { Portfolio } from "./models/Portfolio.js";
import { User } from "./models/User.js";
import { ForumCategory } from "./models/ForumCategory.js";
import { Topic } from "./models/Topic.js";
import { buildAuthContext } from "./context/index.js";

export const createApolloServer = () => {
  // Construct a schema, using GRAPHQL schema language
  const typeDefs = gql(`
    ${portfolioTypes}
    ${userTypes}
    ${forumTypes}
  type Query {
    portfolio(id: ID): Portfolio
    portfolios: [Portfolio]
    userPortfolios: [Portfolio]
    user: User
    forumCategories: [ForumCategory]
    topicsByCategory(category: String): [Topic]
  }
  type Mutation {
    createPortfolio(input: PortfolioInput): Portfolio
    updatePortfolio(id: ID, input: PortfolioInput): Portfolio
    deletePortfolio(id: ID): ID
    signIn(input: SignInInput): User
    signUp(input: SignUpInput): String
    signOut: Boolean
    createTopic(input: TopicInput): Topic
  }`);

  // The root provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...portfolioQueries,
      ...userQueries,
      ...forumQueries,
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations,
      ...forumMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, next }) => ({
      ...buildAuthContext(req, next),
      models: {
        Portfolio: new Portfolio(mongoose.model("Portfolio"), req.user),
        User: new User(mongoose.model("User")),
        ForumCategory: new ForumCategory(mongoose.model("ForumCategory")),
        Topic: new Topic(mongoose.model("Topic"), req.user),
      },
    }),
  });

  return apolloServer;
};
