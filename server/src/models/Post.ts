import mongoose from "mongoose";
mongoose.set('useFindAndModify', false);

const { Schema } = mongoose;

const schema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
  },
  {
    strict: "throw",
    timestamps: true,
  }
);

export default mongoose.model("Post", schema);
