import express from "express";
import next from "next";
import { connectDb } from "./db/index.js";
import { createApolloServer } from "./graphql/index.js";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to DB
connectDb();

app.prepare().then(() => {
  const server = express();

  const apolloServer = createApolloServer();
  apolloServer.applyMiddleware({ app: server });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
