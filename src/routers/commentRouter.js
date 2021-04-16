import express from 'express';
import { postComment, getComment } from '../controllers/commentController';

const commentRouter = express.Router({ mergeParams: true });

commentRouter.get('/', getComment);

commentRouter.post('/', postComment);

export default commentRouter;
