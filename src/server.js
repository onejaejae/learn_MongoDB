import './db';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import routes from './routes';
import userRouter from './routers/userRouter';
import { accessLogStream } from '../config/log';
import blogRouter from './routers/blogRouter';

const app = express();

dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// log
app.use(morgan('dev'));
app.use(morgan('common', { stream: accessLogStream }));

// router
app.use(routes.user, userRouter);
app.use(routes.blog, blogRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(5000, () => {
  console.log('Server listening on 5000');
});
