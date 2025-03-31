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
      type: Number,
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
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
