const axios = require('axios');

console.log('client code running.');

const URI = 'http://localhost:5000';

const test = async () => {
  console.time('loading time: ');

  try {
    let {
      data: { blogs },
    } = await axios.get(`${URI}/blog`);
  } catch (error) {
    console.log(error);
  }

  // blogs = await Promise.all(
  //   blogs.map(async (blog) => {
  //     try {
  //       const [res1, res2] = await Promise.all([
  //         axios.get(`${URI}/user/${blog.user}`),
  //         axios.get(`${URI}/blog/${blog._id}/comment`),
  //       ]);

  //       blog.user = res1.data.user;
  //       blog.comments = await Promise.all(
  //         res2.data.comment.map(async (comment) => {
  //           const {
  //             data: { user },
  //           } = await axios.get(`${URI}/user/${comment.user}`);

  //           comment.user = user;
  //           return comment;
  //         }),
  //       );

  //       return blog;
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }),
  // );

  //console.dir(blogs[0], { depth: 10 });
  console.timeEnd('loading time: ');
};

const testGroup = async () => {
  try {
    await test();
    await test();
    await test();
    await test();
    await test();
    await test();
    await test();
  } catch (error) {
    console.log(error);
  }
};

testGroup();
