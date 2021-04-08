import mongoose from "mongoose";

import User from "../models/User";

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
      return res.status(400).json({ err: "username is required" });
    }

    if (!name || !name.first || !name.last) {
      return res.status(400).json({ err: "name is required" });
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
      return res.status(400).send({ error: "invalid userId" });
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
      body: { age },
    } = req;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).send({ error: "invalid userId" });
    }

    if (!age) {
      return res.status(400).send({ error: "age is required" });
    }
    if (typeof age !== "number") {
      return res.status(400).send({ error: "age must be a number" });
    }

    const newUser = await User.findByIdAndUpdate(
      userId,
      { age },
      { new: true }
    );

    return res.status(200).json({ user: newUser });
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
      return res.status(400).json({ error: "invalid userId" });
    }

    const user = await User.findByIdAndDelete(userId);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
