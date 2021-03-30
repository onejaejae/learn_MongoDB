import express from "express";
import morgan from "morgan";
import { accessLogStream } from "./config/log";
import { logger } from "./config/logger";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

logger.error("Hello 구독자님들.");
// 개발 시 console용
app.use(morgan("dev"));
// 개발 시 log에 저장용
app.use(morgan("common", { stream: accessLogStream }));

const users = [{ name: "wonjae" }];

app.get("/user", (req, res) => {
  res.send({ users: users });
});

app.post("/user", (req, res) => {
  const { body } = req;
  console.log(body);
  users.push(body);
  res.send({ success: true });
});

app.listen(5000, () => {
  console.log("Server listening on 5000");
});
