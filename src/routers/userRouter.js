import express from "express";

import routes from "../routes";
import {
  getUser,
  postUser,
  getUserId,
  deleteUser,
  putUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get(routes.getUser, getUserId);

userRouter.post("/", postUser);

userRouter.put(routes.getUser, putUser);

userRouter.delete(routes.getUser, deleteUser);

export default userRouter;
