import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  avatar: String,
  deletedAt: {
    type: Date,
    default: null
  },
}, {
  methods: {
    async hashCompare(string) {
      return bcrypt.compare(string, this.password)
    }
  }
});


const User = mongoose.model("User", userSchema);

export default User;
