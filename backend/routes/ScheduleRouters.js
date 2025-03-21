import { Router } from "express";
const router = Router();
import { verifyToken } from '../utils/verifyUser.js';

//Insert User Controller
import { getAllSchedules, addSchedules, getById, updateSchedule, deleteSchedule, getSchedulesByGmail } from "../controllers/ScheduleControllers.js";

router.get("/",getAllSchedules);
router.post("/",addSchedules);
router.get("/:id",getById);
router.put("/:id",updateSchedule);
router.delete("/:id",deleteSchedule);


router.get("/view/:id",verifyToken, getSchedulesByGmail);


//export
export default router;



