import express from 'express';
import { postComment } from '../controllers/commentController';

const commentRouter = express.Router({ mergeParams: true });

commentRouter.get('/');

commentRouter.post('/', postComment);

export default commentRouter;
