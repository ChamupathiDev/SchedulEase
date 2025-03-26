import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";

// Import routes
import userRoutes from "./Routers/UserRouters.js";
import authRoutes from "./Routers/authRoutes.js"; // Default export
import scheduleRoutes from "./Routers/ScheduleRouters.js";

const app = express();

// Middlewares
app.use(json());
app.use(cors());

// Routes
app.use("/users", userRoutes);
app.use("/api/auth", authRoutes); // Using the default export from authRoutes.js
app.use("/schedules", scheduleRoutes);

// Connect to MongoDB (Replace with your actual credentials)
connect("mongodb+srv://admin:67pQtRCeIjgJiXbx@cluster0.yth9u.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
