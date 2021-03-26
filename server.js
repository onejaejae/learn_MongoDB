import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

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
