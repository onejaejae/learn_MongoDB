import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'user',
    },
    blog: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'blog',
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Comment = mongoose.model('comment', commentSchema);

export default Comment;
