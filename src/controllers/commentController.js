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
    if (!mongoose.isValidObjectId(blogId)) {
      return res.status(400).send({ err: 'blogId is invalid' });
    }
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).send({ err: 'userId is invalid' });
    }
    if (typeof content != 'string') {
      return res.status(400).send({ err: 'content must be string' });
    }

    // 배열 해체할당(ES6)
    // Promise.all()을 사용해 Response Time 개선
    const [blog, user] = await Promise.all([await Blog.findById(blogId), await User.findById(userId)]);

    //없는 blog에 댓글을 달 경우를 방지
    if (!blog) {
      return res.status(400).send({ err: 'blog does not exist' });
    }

    if (blog.isLive === false) {
      return res.status(400).send({ err: 'blog is not available' });
    }

    if (!user) return res.status(400).send({ err: 'user does not exist' });

    const variable = req.body;
    variable.blog = blog;
    variable.user = user;

    // comment instance 생성, db저장
    const comment = new Comment(variable);

    // Promise.all()을 사용해 Response Time 개선
    await Promise.all([
      comment.save(),
      //$push 사용
      Blog.updateOne({ _id: blogId }, { $push: { comments: comment } }),
    ]);

    return res.status(200).json({ comment });
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const {
      params: { blogId },
    } = req;

    if (!mongoose.isValidObjectId(blogId)) return res.status(400).send({ err: 'blogId is invalid' });

    const comment = await Comment.find({ blog: blogId });

    res.status(200).json({ comment });
  } catch (error) {
    next(error);
  }
};

export const patchComment = async (req, res, next) => {
  try {
    const {
      params: { commentId },
      body: { content },
    } = req;

    if (!mongoose.isValidObjectId(commentId)) return res.status(400).send({ err: 'invalid commentId' });
    if (typeof content !== 'string') return res.status(400).send({ err: 'content must be string' });

    const [comment] = await Promise.all([
      Comment.findOneAndUpdate({ _id: commentId }, { content }, { new: true }),

      // comments._id는 javascript 문법이 아닌 mongodb 문법이다
      // comments 배열의 각 데이터의 id값을 뜻한다
      // comments.$.content의 $는 앞선 조건 { 'comments._id': commentId }을 만족하는 document이다.
      // 즉, 앞선 조건을 만족하는 comments 배열의 content 값을 변경하는 것이다.
      Blog.updateOne({ 'comments._id': commentId }, { 'comments.$.content': content }),
    ]);

    return res.status(200).json({ comment });
  } catch (error) {
    next(error);
  }
};
