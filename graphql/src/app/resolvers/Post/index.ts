import addPost from './addPost';
import listPosts from './listPosts';
import removePost from './removePost';
import updatePost from './updatePost';


const resolvers: any  = {
  Mutation: {
    addPost,
    removePost,
    updatePost
  },
  Query: {
    listPosts
  },
};

export default resolvers;
