import mongoose from "mongoose";

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

export const data = {
  users: [
    {
      _id: user1Id,
      avatar:
        "https://f0.pngfuel.com/png/312/283/man-face-clip-art-png-clip-art-thumbnail.png",
      email: "rafal@gmail.com",
      name: "Rafal P",
      username: "rafalP",
      info: "Hello I am Rafal and I am a developer!",
      password: "password124",
      role: "admin",
    },
    {
      _id: user2Id,
      avatar:
        "https://f0.pngfuel.com/png/312/283/man-face-clip-art-png-clip-art-thumbnail.png",
      email: "test@gmail.com",
      name: "Test User",
      username: "Test99",
      info: "Hello I am Test and I am a test!",
      password: "testtest",
    },
  ],
  portfolios: [
    {
      title: "Job in Netcentric",
      company: "Netcentric",
      companyWebsite: "www.google.com",
      location: "Spain, Barcelona",
      jobTitle: "Engineer",
      description: "Doing something, programing....",
      startDate: "01/01/2014",
      endDate: "01/01/2016",
      user: user1Id,
    },
    {
      title: "Job in Siemens",
      company: "Siemens",
      companyWebsite: "www.google.com",
      location: "Slovakia, Kosice",
      jobTitle: "Software Engineer",
      description: "Responsoble for parsing framework for JSON medical data.",
      startDate: "01/01/2011",
      endDate: "01/01/2013",
      user: user1Id,
    },
    {
      title: "Work in USA",
      company: "WhoKnows",
      companyWebsite: "www.google.com",
      location: "USA, Montana",
      jobTitle: "Housekeeping",
      description: "So much responsibility....Overloaaaaaad",
      startDate: "01/01/2010",
      endDate: "01/01/2011",
      user: user1Id,
    },
  ],
};
