export const portfolioFields = `
  title: String,
  company: String,
  companyWebsite: String,
  location: String,
  jobTitle: String,
  description: String,
  startDate: String,
  endDate: String
`;

export const portfolioTypes = `
  type Portfolio {
    _id: ID,
    ${portfolioFields}
  }

  input PortfolioInput {
    ${portfolioFields}
  }
`;

export const userTypes = `
  type User {
    _id: ID,
    avatar: String
    username: String
    name: String
    email: String
    role: String
  }

  input SignUpInput {
    avatar: String
    username: String!
    name: String
    email: String!
    password: String!
    passwordConfirmation: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }
`;

export const forumTypes = `
  type ForumCategory {
    _id: ID
    title: String
    subTitle: String
    slug: String
  }

  type Author {
    avatar: String
    username: String
  }

  type Topic {
    _id: ID
    slug: String
    title: String
    content: String
    forumCategory: ForumCategory
    user: Author
    createdAt: String
  }

  input TopicInput {
    title: String
    content: String
    forumCategory: String
  }
`;
