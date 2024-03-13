
const Comment = require("./Comments");
const Mutation = require("./Mutation");
const Post = require("./Post");
const Query = require("./Query");
const Subscription = require("./Subscription");
const User = require("./Users");
const resolvers = {
  Subscription,
  Query,
  Mutation,
  Comment,
  Post,
  User
  }


  module.exports = {
    resolvers,
  }

