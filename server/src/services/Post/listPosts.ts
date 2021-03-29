import Post from "../../models/Post";

export default async function (ctx: any) {
  const limit: number = ctx.req.limit || 10;
  const page: number = ctx.req.page || 1;

  console.log("[POST]: listPost");

  const query = Post.find(ctx.req && ctx.req._id ? { _id: ctx.req._id } : {})
    .limit(limit)
    .skip(limit * (page - 1));

  ctx.res = {
    limit,
    page,
    count: await Post.countDocuments(query.getQuery()),
    data: await query.lean(),
  };
}
