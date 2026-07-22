const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        task: {
            type: String,
            required: [true, "Task is required"]
        },

        taskDone: {
            type: Boolean,
            required: true,
        },
        color: {
            type: String,
            enum: ["red", "green", "blue", "yellow", "purple", "orange", "pink", "brown", "gray", "black"],
            default: "gray"
        },
    }, { timestamps: true }
)

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;

