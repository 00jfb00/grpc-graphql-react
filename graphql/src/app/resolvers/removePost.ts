import PostClient from '../services/Post/PostClient';

const client = PostClient();

interface Params {
  _id: string;
}

export default (root:any, params: Params) => {
  return new Promise((resolve: any, reject: any) => {
    client.removePost(params, function(err: any, response: any) {
    console.log(params, err)
    if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};
