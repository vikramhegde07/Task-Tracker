import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: "medium",
    },

    status: {
        type: String,
        enum: ["todo", "in-progress", "done", "cancelled"],
        default: "todo",
    },

    dueDate: {
        type: Date,
    },

}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
