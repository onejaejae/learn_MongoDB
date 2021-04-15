// user
const USER = '/user';
const GET_USER = '/:userId';

// blog
const BLOG = '/blog';
const BLOG_ID = '/:blogId';
const PATCH_BLOG = '/:blogId/live';

// comment
const COMMENT = '/blog/:blogId/comment';

const routes = {
  user: USER,
  getUser: GET_USER,
  blog: BLOG,
  blogId: BLOG_ID,
  patchBlog: PATCH_BLOG,
  comment: COMMENT,
};

export default routes;
