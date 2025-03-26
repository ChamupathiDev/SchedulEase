import express from "express";

const router = express.Router();

import { getallUsers, addUsers, getById, updateUser, deleteUser, getallModules } from "../controllers/ModuleControllers.js";

// CRUD Routes
router.get("/", getallModules);         // Get all modules
router.post("/", addModules);          // Create a module
router.get("/:id", getById);         // Get module by ID
router.put("/:id", updateModule);      // Update module by ID
router.delete("/:id", deleteModule);   // Delete module by ID

export default router;