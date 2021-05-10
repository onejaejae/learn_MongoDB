import mongoose from 'mongoose';

export const commentSchema = new mongoose.Schema(
  {
    user: {
      _id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        // ref는 mongoose.model()의 첫번째 인자와 같아야한다.
        ref: 'user',
        index: true,
      },
      username: {
        type: String,
        required: true,
      },
      name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
      },
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

commentSchema.index({ blog: 1, createAt: -1 });

const Comment = mongoose.model('comment', commentSchema);

export default Comment;
