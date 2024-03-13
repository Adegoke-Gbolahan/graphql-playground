const { createPubSub } = require('graphql-yoga');
import db from "./db";


async function createContext() {
  return {
    pubSub:createPubSub(),
    db,
  };
}

module.exports = createContext;
