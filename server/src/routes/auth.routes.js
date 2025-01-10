import express from "express";
import { login, logout, signup,profile,updateProfile } from "../controllers/auth.controllers.js";
import { isAuthenticated } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.post("/login",login)
router.post("/signup",signup)
router.get("/logout", logout);
router.get("/profile",isAuthenticated,profile);
router.post("/update",isAuthenticated,updateProfile);

export default router;