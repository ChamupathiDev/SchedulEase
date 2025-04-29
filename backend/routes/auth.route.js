import express from "express";
import { google, signin, signup, signout } from "../controllers/auth.controller.js";
import { userValidationRules, validate } from "../utils/validators.js";



const router = express.Router();

router.post("/signup",userValidationRules(), validate, signup)
router.post("/signin",signin)
router.post("/google",google)
router.get('/signout', signout)


export default router;