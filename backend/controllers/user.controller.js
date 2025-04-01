import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

export const updateUser = async (req, res, next) => {
  try {
    // Find user by ID from URL param
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found!"));

    // Check if email in token matches user's email
    if (req.user.email !== user.email) {
      return next(errorHandler(401, "You can update only your account!"));
    }

    // Hash password if updated
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          fullName: req.body.fullName,
          studentid: req.body.studentid,
          email: req.body.email,
          password: req.body.password,
          dateOfBirth: req.body.dateOfBirth,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          degreeProgram: req.body.degreeProgram,
          faculty: req.body.faculty,
          gender: req.body.gender,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    // Exclude password from response
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) return next(errorHandler(400, "No file uploaded"));

    // Ensure file path uses forward slashes
    const normalizedPath = req.file.path.replace(/\\/g, '/');

    if (!req.user.email) {
      return next(errorHandler(401, "Not authenticated"));
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      { $set: { profilePicture: normalizedPath } },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // Find user by ID from URL param
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found!"));

    // Check if email in token matches user's email
    if (req.user.email !== user.email) {
      return next(errorHandler(401, "You can delete only your account!"));
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(error);
  }
};

// Get all users (for admin)
export const adminGetUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    // Remove password from each user
    const sanitizedUsers = users.map((u) => {
      const { password, ...rest } = u._doc;
      return rest;
    });
    res.status(200).json(sanitizedUsers);
  } catch (error) {
    next(error);
  }
};

// Get a single user by id (for admin)
export const adminGetUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Update a user (for admin)
export const adminUpdateUser = async (req, res, next) => {
  try {
    // Note: You might want to hash the password here if provided.
    if (req.body.password) {
      const bcryptjs = await import("bcryptjs");
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: {
          fullName: req.body.fullName,
          studentid: req.body.studentid,
          email: req.body.email,
          password: req.body.password,
          dateOfBirth: req.body.dateOfBirth,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          degreeProgram: req.body.degreeProgram,
          faculty: req.body.faculty,
          gender: req.body.gender,
          profilePicture: req.body.profilePicture,
        },
       },
      { new: true }
    );
    if (!updatedUser) return next(errorHandler(404, "User not found"));
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Delete a user (for admin)
export const adminDeleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(error);
  }
};
