// Routers/authRoutes.js
import { Router } from "express";
import User from "../Model/UserModel.js";  // Import the User model

const router = Router();

// Login using email (gmail field)
router.post("/login", async (req, res) => {
  try {
    const { gmail } = req.body;

    // Check if user exists in DB
    const user = await User.findOne({ gmail });  // Use findOne on the User model

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // If found, return success message
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
