import mongoose from 'mongoose';
import { commentSchema } from './Comment';

const blogSchema = new mongoose.Schema(
  {
    user: {
      _id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        // ref는 mongoose.model()의 첫번째 인자와 같아야한다.
        ref: 'user',
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
    comments: [commentSchema],
  },
  { timestamps: true },
);

// index 생성
// 중간에 index를 추가해도 기존 데이터에 모두 index가 적용된다.
blogSchema.index({ 'user._id': 1, updatedAt: 1 });
blogSchema.index({ title: 'text', content: 'text' });

// blogSchema.virtual('comments', {
//   ref: 'comment',
//   localField: '_id',
//   foreignField: 'blog',
// });

// blogSchema.set('toObject', { virtuals: true });
// blogSchema.set('toJSON', { virtuals: true });

const Blog = mongoose.model('blog', blogSchema);
export default Blog;
