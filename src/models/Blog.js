import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      // ref는 mongoose.model()의 첫번째 인자와 같아야한다.
      ref: 'user',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isLive: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

const Blog = mongoose.model('blog', blogSchema);
export default Blog;
