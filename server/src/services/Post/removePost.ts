import Post from "../../models/Post";

export default async function (ctx: any) {
  if (!ctx.req || !ctx.req._id) {
    throw new Error("required.id");
  }
  try {
    console.info("[POST]: removePost");
    await Post.findOneAndRemove({ _id: ctx.req._id });
  } catch (err) {
    throw err;
  }
}
