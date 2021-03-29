import Post from "../../models/Post";

export default async function (ctx: any) {
  if (ctx.req.title && ctx.req.title.length > 10) {
    throw new Error("invalid.title.length");
  }
  try {
    console.info("[POST]: addPost");
    const post = new Post(ctx.req);
    await post.save();
    ctx.res = post;
  } catch (err) {
    throw err;
  }
}
