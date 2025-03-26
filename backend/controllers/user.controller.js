import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req,res) => {
    res.json({
        message: 'API is working!',
    });
};

export const updateUser = async (req, res, next) => {
    try {
        // Find user by ID from URL param
        const user = await User.findById(req.params.id);
        if (!user) return next(errorHandler(404, 'User not found!'));

        // Check if email in token matches user's email
        if (req.user.email !== user.email) {
            return next(errorHandler(401, 'You can update only your account!'));
        }

        // Hash password if updated
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        // Find user by ID from URL param
        const user = await User.findById(req.params.id);
        if (!user) return next(errorHandler(404, 'User not found!'));

        // Check if email in token matches user's email
        if (req.user.email !== user.email) {
            return next(errorHandler(401, 'You can delete only your account!'));
        }
        
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...');
    } catch (error) {
        next(error);
    }
}