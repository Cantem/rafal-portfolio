import "dotenv/config";

export const mongoDbConfig = {
  DB_URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority`,
  SESSION_SECRET: `session_${process.env.DB_SESSION_SECRET}`,
};
