import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    studentid: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    degreeProgram: {
      type: String,
      required: true,
    },

    faculty: {
      type: String,
      required: true,
      enum: ["Faculty of Computing", "Faculty of Engineering", "Faculty of Business"],
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },

    profilePicture: {
      type: String,
      default:
        "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
