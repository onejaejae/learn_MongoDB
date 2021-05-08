import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },

    // 필수가 아니면 아래와 같은 형태로 작성해도 된다.
    age: {
      type: Number,
      index: true,
    },
    email: String,
  },
  // timestamps는 mongoose가 createAt, updateAt을 자동으로 만들어준다.
  { timestamps: true },
);

const User = mongoose.model('user', userSchema);
export default User;
