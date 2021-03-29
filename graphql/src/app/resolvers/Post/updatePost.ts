import PostClient from '../../clients/Post/PostClient';

const client = PostClient();

interface Params {
  _id: string;
  title: string;
  image: string;
}

export default (root:any, params: Params) => {
  return new Promise((resolve: any, reject: any) => {
    client.updatePost(params, function(err: any, response: any) {
    if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};
