const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const { getUser } = require("./helpers/verifyToken");
const express = require("express");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

const pubsub = new PubSub();
const PORT = process.env.PORT || 4000;

async function startServer() {
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  const server = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      const token = req.headers.authorization || "";
      const user = await getUser(token);
      return { user, pubsub };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
    
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
      },
      {
        server: httpServer,
        path: server.subscriptionsPath,
      }
    );
  });
}

startServer();
