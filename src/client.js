const axios = require('axios');

console.log('client code running.');

const test = async () => {
  let {
    data: { blogs },
  } = await axios.get('http://localhost:5000/blog');

  blogs = await Promise.all(
    blogs.map(async (blog) => {
      try {
        const res1 = await axios.get(`http://localhost:5000/user/${blog.user}`);
        const res2 = await axios.get(`http://localhost:5000/blog/${blog._id}/comment`);

        blog.user = res1.data.user;
        blog.comments = res2.data.comment;
        return blog;
      } catch (error) {
        console.log(error.message);
      }
    }),
  );
  console.log({ blog: blogs[0] });
};

test();
