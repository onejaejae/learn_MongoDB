import mongoose from 'mongoose';
import Blog from '../models/Blog';
import Comment from '../models/Comment';
import User from '../models/User';

export const getUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users: users });
  } catch (error) {
    next(error);
  }
};

export const postUser = async (req, res, next) => {
  try {
    const {
      body: { username, name },
      body,
    } = req;

    if (!username) {
      return res.status(400).json({ err: 'username is required' });
    }

    if (!name || !name.first || !name.last) {
      return res.status(400).json({ err: 'name is required' });
    }

    const user = new User(body);
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    // try문에서 client 오류를 모두 잡아야한다

    next(error);
  }
};

export const getUserId = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    // isValidObjectId :  Returns true if Mongoose can cast the given value to an ObjectId, or false otherwise.
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).send({ error: 'invalid userId' });
    }

    const user = await User.findById(userId);
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const putUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body: { age, name },
    } = req;

    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ error: 'invalid userId' });

    if (!age && !name) return res.status(400).send({ error: 'age or name is required' });

    if (age && typeof age !== 'number') return res.status(400).send({ error: 'age must be a number' });

    if (name && (typeof name.first !== 'string' || typeof name.last !== 'string')) {
      return res.status(400).send({ error: 'name must be a string' });
    }

    const user = await User.findById(userId);

    if (name) {
      user.name = name;

      await Promise.all([
        // updateMany 사용
        Blog.updateMany({ 'user._id': userId }, { 'user.name': name }),

        // comments.$[element].user.name 여기서 element는 comments가 되어 arrayFilters의 filter로 사용된다.
        // [element]의 element는 개발자 임의로 설정 가능, but arrayFilters의 변수명이랑 같게해야한다.
        // 즉, comments 배열의 어떤 인덱스의 user.name 값을 name으로 update 하는 것인데 여기서 어떤 인덱스를
        // 필터링하는 것을 arrayFilters가 수행하고 그것과 일치하는 배열들을 update 해주는 것이다.
        Blog.updateMany(
          {},
          { 'comments.$[element].user.name': name },
          { arrayFilters: [{ 'element.user._id': userId }] },
        ),
        Comment.updateMany({ 'user._id': userId }, { 'user.name': name }),
      ]);
    }
    if (age) user.age = age;
    await user.save();

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: 'invalid userId' });
    }

    const [user] = await Promise.all([
      User.findByIdAndDelete(userId),
      Blog.deleteMany({ 'user._id': userId }),
      Blog.updateMany(
        { 'comments.user._id': userId },
        { $pull: { comments: { user: { _id: mongoose.Types.ObjectId(userId) } } } },
      ),
      Comment.deleteMany({ 'user._id': userId }),
    ]);

    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
