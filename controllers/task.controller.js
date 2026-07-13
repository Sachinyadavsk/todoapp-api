const Task = require("../models/task.model");

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({
            status: "success",
            data: tasks,
            message: "Tasks retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTask = async (req, res) => {
    const { task, taskDone, color } = req.body;
    try {
        const newTask = new Task({ task, taskDone, color });
        const savedTask = await newTask.save();
        res.status(201).json({
            status: "success",
            data: savedTask,
            message: "Task created successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { task, taskDone, color } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { task, taskDone, color }, { new: true });
        res.json({
            status: "success",
            data: updatedTask,
            message: "Task updated successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.json({
            status: "success",
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.taskDone = async (req, res) => {
    const { id } = req.params;
    const { taskDone } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { taskDone }, { new: true });
        res.json({
            status: "success",
            data: updatedTask,
            message: "Task mark status updated successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAllTask = async (req, res) => {
    try {
        await Task.deleteMany({});
        res.status(200).json({
            status: "success",
            message: "Clear the all task list data"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


