import express from "express";

import routes from "../routes";
import { getUser, postUser, getUserId } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get(routes.getUser, getUserId);

userRouter.post("/", postUser);

export default userRouter;
