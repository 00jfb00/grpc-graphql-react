import Post from "../../models/Post";

export default async function (ctx: any) {
  if (!ctx.req || !ctx.req._id) {
    throw new Error("required.id");
  }
  try {
    console.info("[POST]: updatePost");
    ctx.res  = await Post.findOneAndUpdate(
      { _id: ctx.req._id }, 
      { title: ctx.req.title, image: ctx.req.image }, 
      { projection: { _id: 1, image: 1, title: 1 }, returnOriginal: false }
    );
  } catch (err) {
    throw err;
  }
}
