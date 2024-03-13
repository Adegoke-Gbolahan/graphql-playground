const { gql } = require('apollo-server')

const typeDefs = `
type Query {
  greeting(name: String): String!
  me: User!
  post: Post!
  users(query: String): [User!]!
  posts(query: String): [Post]!
  comments(query: String): [Comment]!
}
type Mutation {
  createUser(data: CreateUserInput): User!
  deleteUser(id: ID!): User!
  updateUser(id:ID! data:UpdateUserInput):User!
  createPost(data: CreatePostInput): Post!
  deletePost(id: ID!): Post
  createComment(data: CreateCommentInput): Comment!
}
type Subscription{
  count: Int!
  comment(postId:ID!): Comment!
  post:PostSubscriptionPayload!
}

#  ? Like the type of data coming from the user e.g: form
input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

input UpdateUserInput {
  name: String
  email: String
  age: Int
}

input CreatePostInput {
  title: String!
  body: String!
  published: Boolean!
  author: ID!
}

input CreateCommentInput {
  text: String!
  post: ID!
  author: ID!
}


# ? Like table model declearation
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
  comments: [Comment]!
}
type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
}
enum MutationType {
  CREATED
  UPDATED
  DELETED
}
type PostSubscriptionPayload{
  mutation: MutationType!
  data:Post!
}
`;

module.exports = {
  typeDefs,
}