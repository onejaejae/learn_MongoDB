import mongoose from 'mongoose';
import User from '../models/User';
import Blog from '../models/Blog';

export const getBlog = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).limit(10);

    return res.status(200).json({ blogs });
  } catch (error) {
    next(error);
  }
};

export const getSpecificBlog = async (req, res, next) => {
  try {
    const {
      params: { blogId },
    } = req;

    if (!mongoose.isValidObjectId(blogId)) return res.status(400).send({ err: 'blogId is invalid' });

    const blog = await Blog.findById(blogId);
    return res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
};

export const postBlog = async (req, res, next) => {
  try {
    const {
      body: { user: userId, title, content, isLive },
    } = req;

    if (!mongoose.isValidObjectId(user)) return res.status(400).send({ err: 'userId is invalid' });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ err: 'user does not exist' });
    }

    if (!title) {
      return res.status(400).send({ err: 'title is required' });
    } else {
      if (typeof title !== 'string') return res.status(400).send({ err: 'title must be a String' });
    }

    if (!content) {
      return res.status(400).send({ err: 'content is required' });
    } else {
      if (typeof content !== 'string') return res.status(400).send({ err: 'content must be a String' });
    }

    if (isLive && typeof isLive !== 'boolean') return res.status(400).send({ err: 'isLive must be a boolean' });

    // const blog = new Blog({...req.body, user})로 할 경우 클라이언트에서 user 정보를 볼 수 있게 된다. 저장 될 떄는 똑같이 objected id가 저장
    const blog = new Blog(req.body);
    await blog.save();

    return res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
};

export const putBlog = async (req, res, next) => {
  try {
    const {
      body: { title, content },
      params: { blogId },
    } = req;

    if (!mongoose.isValidObjectId(blogId)) return res.status(400).send({ err: 'blogId is invalid' });
    if (!title) {
      return res.status(400).send({ err: 'title is required' });
    } else {
      if (typeof title !== 'string') return res.status(400).send({ err: 'title must be a String' });
    }

    if (!content) {
      return res.status(400).send({ err: 'content is required' });
    } else {
      if (typeof content !== 'string') return res.status(400).send({ err: 'content must be a String' });
    }

    const blog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
    return res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
};

export const patchBlog = async (req, res, next) => {
  try {
    const {
      body: { isLive },
      params: { blogId },
    } = req;

    if (!mongoose.isValidObjectId(blogId)) return res.status(400).send({ err: 'blogId is invalid' });
    if (!isLive) {
      return res.status(400).send({ err: 'isLive is required' });
    } else {
      if (typeof isLive !== 'boolean') return res.status(400).send({ err: 'isLive must be a boolean' });
    }

    const blog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
    return res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
};
