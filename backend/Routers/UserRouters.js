import { Router } from "express";
const router = Router();
//Insert Model
import User from "../Model/UserModel.js";
//Insert User Controller
import { getAllUsers, addUsers, getById, updateUser, deleteUser } from "../Controlers/UserControllers.js";

router.get("/",getAllUsers);
router.post("/",addUsers);
router.get("/:id",getById);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);

//export
export default router;