import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.DB_HOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected♥"))
  .catch((err) => console.log(err.message));