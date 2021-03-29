import * as path from 'path';
import * as fs from 'fs';
import { makeExecutableSchema } from 'apollo-server';

import resolvers from './resolvers';

const PostSchema: string = fs.readFileSync(path.resolve(__dirname, './schema/Post.graphql')).toString('utf8');

export const schema: any = makeExecutableSchema({
  resolvers,
  typeDefs: [PostSchema]
});
