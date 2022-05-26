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
input SignUpInput {
  avatar: String
  username: String!
  name: String
  email: String!
  password: String!
  passwordConfirmation: String!
}
`;
