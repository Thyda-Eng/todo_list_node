import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { csrfProtection } from "../middlewares/csrfMiddleware.js";
import {
  getAllTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", authenticate, getAllTasks);
router.post("/", authenticate, csrfProtection, createTask);
router.patch("/:id", authenticate, csrfProtection, updateTask);
router.put("/:id/status", authenticate, csrfProtection, updateTaskStatus);
router.delete("/:id", authenticate, csrfProtection, deleteTask);

export default router;