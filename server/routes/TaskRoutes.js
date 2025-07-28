import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    toggleStatus
} from "../controllers/TaskController.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.patch("/:id/status", toggleStatus); // optional
router.delete("/:id", deleteTask);

export default router;
