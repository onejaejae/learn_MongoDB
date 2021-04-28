import express from 'express';
import { postComment, getComment, patchComment, deleteComment } from '../controllers/commentController';
import routes from '../routes';

const commentRouter = express.Router({ mergeParams: true });

commentRouter.get('/', getComment);

commentRouter.post('/', postComment);

commentRouter.patch(routes.commentId, patchComment);

commentRouter.delete(routes.commentId, deleteComment);

export default commentRouter;
