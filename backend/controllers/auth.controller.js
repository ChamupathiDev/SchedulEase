import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { fullName, studentid, email, password, dateOfBirth, phoneNumber, address, degreeProgram, faculty, gender } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ fullName, studentid, email, password: hashedPassword, dateOfBirth, phoneNumber, address, degreeProgram, faculty, gender });
  try {
    await newUser.save(); 
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassowrd = bcryptjs.compareSync(password, validUser.password);
    if (!validPassowrd) return next(errorHandler(401, "wrong credentials"));
    const token = jwt.sign({ email: validUser.email }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user =  await User.findOne({ email: req.body.email})
    if (user) {
      const token = jwt.sign({ email: user.email}, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200)
      .json(rest);

    } else {
      const generatedPassword = Math.random().toString(36). 
      slice(-8) + Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync
      (generatedPassword, 10);
      const newUser = new User({ 
        email: req.body.email, password: hashedPassword,
        profilePicture: req.body.photo
      });
      await newUser.save();
      const token = jwt.sign({ email: newUser.email}, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200)
      .json(rest);
    }

  } catch (error) {
    next(error)
  }
};

export const signout = (req,res) => {
  res.clearCookie('access_token').status(200).json('Signout success');
}


