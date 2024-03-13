import { makeExecutableSchema } from '@graphql-tools/schema';
import fs from 'fs';
import Query from './resolvers/Query';
import User from './resolvers/Users';
import Mutation from './resolvers/Mutation';
import Post from './resolvers/Post';
import Comment from './resolvers/Comments';
import Subscription from './resolvers/Subscription';


const typeDefinitions = fs.readFileSync('./src/schema.graphql', 'utf8')
 
const resolvers = {
    Query,
    User,
    Mutation,
    Post,
    Comment,
    Subscription
  }
 
export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions]
})