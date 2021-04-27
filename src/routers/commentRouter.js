import express from 'express';
import { postComment, getComment, patchComment } from '../controllers/commentController';
import routes from '../routes';

const commentRouter = express.Router({ mergeParams: true });

commentRouter.get('/', getComment);

commentRouter.post('/', postComment);

commentRouter.patch(routes.patchComment, patchComment);

export default commentRouter;
