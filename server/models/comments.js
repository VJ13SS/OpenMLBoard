import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  comment: { type: String, required: true },
  projectId: { type: String, required: true },
});

const commentModel = mongoose.models.ml_comments || mongoose.model("ml_comments", commentSchema);

export default commentModel;
