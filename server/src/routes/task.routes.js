import express from "express";
import { isAuthenticated } from "../middlewares/auth.middlewares.js";
import { createTask, getMyTask, updateTask, deleteTask } from "../controllers/task.controllers.js";
const router = express.Router();

router.post("/new",isAuthenticated,createTask)
router.get("/all",isAuthenticated,getMyTask)
router
.route("/:id")
.put(isAuthenticated,updateTask)
.delete(isAuthenticated,deleteTask)
export default router;