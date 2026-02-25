import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  authorId: mongoose.Types.ObjectId;
  author:string;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    author:{
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", postSchema);