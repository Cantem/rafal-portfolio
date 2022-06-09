import mongoose from "mongoose";
const Schema = mongoose.Schema;

const forumCategorySchema = new Schema({
  title: String,
  subTitle: String,
  slug: { type: String, unique: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

export const ForumCategory = mongoose.model(
  "ForumCategory",
  forumCategorySchema
);
