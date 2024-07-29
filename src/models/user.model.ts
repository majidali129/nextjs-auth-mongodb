import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true
    },
    email: {
      type: String,
      required: [true, "email is mendatory"]
    },
    password: {
      type: String,
      required: [true, "password is required"]
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    emailVerifyToken: String,
    emailVerifyTokenExpiry: Date,
    forgotPasswrodToken: String,
    forgotPasswordTokenExpiry: Date
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
