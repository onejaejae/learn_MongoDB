import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { accessLogStream } from "../config/log";
import User from "./models/User";

const app = express();

dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 개발 시 console용
app.use(morgan("dev"));
// 개발 시 log에 저장용
app.use(morgan("common", { stream: accessLogStream }));

const users = [{ name: "wonjae" }];

const server = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB Connected♥");

    app.get("/user", (req, res) => {
      logger.info(`GET /user 2OO "유저 화면으로 이동"`);
      res.send({ users: users });
    });

    app.post("/user", async (req, res) => {
      const user = new User(req.body);
      await user.save();
      return res.send({ user });
    });

    app.listen(5000, () => {
      console.log("Server listening on 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

server();
