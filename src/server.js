import './db';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import routes from './routes';
import userRouter from './routers/userRouter';
import blogRouter from './routers/blogRouter';
import commentRouter from './routers/commentRouter';
import { accessLogStream } from '../config/log';
import { generateFakeData } from '../faker2';

const app = express();

dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// log
app.use(morgan('dev'));
app.use(morgan('common', { stream: accessLogStream }));

//faker
// for (let i = 0; i < 20; i++) {
//   const generateFake = async () => {
//     await generateFakeData(10, 1, 10);
//   };
//   generateFake();
// }

// router
app.use(routes.user, userRouter);
app.use(routes.blog, blogRouter);
app.use(routes.comment, commentRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(5000, () => {
  console.log('Server listening on 5000');
});
