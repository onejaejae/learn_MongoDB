import mongoose from 'mongoose';
import Blog from '../models/Blog';
import Comment from '../models/Comment';
import User from '../models/User';

export const postComment = async (req, res, next) => {
  try {
    const {
      params: { blogId },
      body: { content, user: userId },
    } = req;

    // client 오류 체크
    if (!mongoose.isValidObjectId(blogId)) return res.status(400).send({ err: 'blogId is invalid' });
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: 'userId is invalid' });
    if (typeof content != 'string') return res.status(400).send({ err: 'content must be string' });

    // 배열 해체할당(ES6)
    // Promise.all()을 사용해 Response Time 개선
    const [blog, user] = await Promise.all([await Blog.findById(blogId), await User.findById(userId)]);

    if (!blog) return res.status(400).send({ err: 'blog does not exist' });
    if (blog.isLive === false) return res.status(400).send({ err: 'blog is not available' });
    if (!user) return res.status(400).send({ err: 'user does not exist' });

    const variable = req.body;
    variable.blog = blogId;

    // comment instance 생성, db저장
    const comment = new Comment(variable);
    await comment.save();

    return res.status(200).json({ comment });
  } catch (error) {
    next(error);
  }
};
