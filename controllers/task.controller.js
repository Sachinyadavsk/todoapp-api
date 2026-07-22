const Task = require("../models/task.model");

exports.getAllTasks = async (req, res) => {
    try {
        const userId = req.user.id;

        const tasks = await Task.find({ userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: "success",
            count: tasks.length,
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
        const user = req.user.id;
        if (!user) {
            res.status(401).json({
                message: "User not found",
            });
        }

        if (!task || !taskDone || !color) {
            res.status(401).json({
                message: "All field requird",
            });
        }

        const savedTask = await Task.create({
            userId: user,
            task,
            taskDone,
            color
        });

        res.status(201).json({
            status: "success",
            data: savedTask,
            message: "Task created successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Error the task not created",
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { task, taskDone, color } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId },
            { task, taskDone, color },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                status: "error",
                message: "Task not found or unauthorized"
            });
        }

        return res.status(200).json({
            status: "success",
            data: updatedTask,
            message: "Task updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const deletedTask = await Task.findOneAndDelete({
            _id: id,
            userId
        });

        if (!deletedTask) {
            return res.status(404).json({
                status: "error",
                message: "Task not found or unauthorized"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Task deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

exports.taskDone = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { taskDone } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId },
            { taskDone },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                status: "error",
                message: "Task not found or unauthorized"
            });
        }
        return res.status(200).json({
            status: "success",
            data: updatedTask,
            message: "Task status updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

exports.deleteAllTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await Task.deleteMany({ userId });
        return res.status(200).json({
            status: "success",
            deletedCount: result.deletedCount,
            message: "All tasks deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};


