import addPost from "./addPost";
import listPosts from "./listPosts";
import removePost from "./removePost";
import updatePost from "./updatePost";

const protoPath = "Post.proto";

export default {
  protoPath,
  implementation: {
    PostService: {
      addPost,
      listPosts,
      removePost,
      updatePost
    },
  },
};
