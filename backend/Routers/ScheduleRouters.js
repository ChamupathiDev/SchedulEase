import { Router } from "express";
const router = Router();
//Insert Model
import Schedule from "../Model/ScheduleModel.js";
//Insert User Controller
import { getAllSchedules, addSchedules, getById, updateSchedule, deleteSchedule, getSchedulesByGmail } from "../Controlers/ScheduleControllers.js";

router.get("/",getAllSchedules);
router.post("/",addSchedules);
router.get("/:id",getById);
router.put("/:id",updateSchedule);
router.delete("/:id",deleteSchedule);

// ✅ Fetch schedules using email (no token required)
router.get("/gmail/:gmail", getSchedulesByGmail);
//router.get("/email/:gmail", ScheduleController.getSchedulesByGmail);

//export
export default router;



