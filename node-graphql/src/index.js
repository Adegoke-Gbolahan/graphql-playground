const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers/resolvers");
const createContext = require("./context");
const port = process.env.PORT || 9090;

async function startServer() {
    const context = await createContext();
  
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context,
    });
  
    server.listen({ port }, () => {
      console.log(`Server runs at: http://localhost:${port}`);
    });
  }
  
  startServer();

  
  
  
  