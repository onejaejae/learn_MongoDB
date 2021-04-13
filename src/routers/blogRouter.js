import express from 'express';
import { getBlog, getSpecificBlog, postBlog, putBlog, patchBlog } from '../controllers/blogController';
import routes from '../routes';

const blogRouter = express.Router();

blogRouter.get('/', getBlog);
blogRouter.get(routes.blogId, getSpecificBlog);

blogRouter.post('/', postBlog);

blogRouter.put(routes.blogId, putBlog);
blogRouter.patch(routes.patchBlog, patchBlog);

export default blogRouter;
