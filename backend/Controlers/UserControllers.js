import User from "../Model/UserModel.js";

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users.length) {
            return res.status(404).json({ message: "No users found", users: [] });
        }
        return res.status(200).json({ users });
    } catch (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Add a user
const addUsers = async (req, res) => {
    const { name, gmail, age, address } = req.body;

    if (!name || !gmail || !age || !address) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(gmail)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const user = new User({ name, gmail, age, address });
        await user.save();
        return res.status(201).json({ user });
    } catch (err) {
        console.error("Error adding user:", err);
        return res.status(500).json({ message: "Error adding user", error: err.message });
    }
};

// Get user by ID
const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ message: "Error fetching user", error: err.message });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ updatedUser });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: "Error updating user", error: err.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ message: "Error deleting user", error: err.message });
    }
};

export { getAllUsers, addUsers, getById, updateUser, deleteUser };
