
const { createTask, getAllTasks, updateTask, deleteTask, taskDone, deleteAllTask } = require("../controllers/task.controller");

const express = require("express");
const router = express.Router();

router.get("/", getAllTasks);
router.post("/add-task", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.put("/:id/done", taskDone);
router.delete("/", deleteAllTask);


module.exports = router;