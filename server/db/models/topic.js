import mongoose from "mongoose";
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  title: String,
  content: String,
  slug: { type: String, unique: true, index: true },
  forumCategory: { type: Schema.Types.ObjectId, ref: "ForumCategory" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export const Topic = mongoose.model("Topic", topicSchema);
