import addPost from './addPost';
import listPosts from './listPosts';
import removePost from './removePost';

const resolvers: any  = {
  Mutation: {
    addPost,
    removePost
  },
  Query: {
    listPosts
  },
};

export default resolvers;
