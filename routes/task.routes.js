const express = require("express");
const router = express.Router();

const { createTask, getAllTasks, updateTask, deleteTask, taskDone, deleteAllTask } = require("../controllers/task.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, getAllTasks);
router.post("/add-task", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.put("/:id/done", authMiddleware, taskDone);
router.delete("/", authMiddleware, deleteAllTask);


module.exports = router;