const { createPubSub } = require('graphql-yoga');
const prisma = require ("./database");


async function createContext() {
  return {
    pubSub:createPubSub(),
    prisma,
  };
}

module.exports = createContext;
