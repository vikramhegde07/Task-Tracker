import Task from "../models/TaskModel.js";

// CREATE a task
export const createTask = async (req, res) => {
    const { title, description, priority, status, dueDate } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        const task = new Task({
            title,
            description,
            priority,
            status,
            dueDate,
            userId: req.userId,
            isDemo: true
        });

        await task.save();
        return res.status(201).json({ message: "Task created", task });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err });
    }
};

// GET all tasks for logged-in user
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
        return res.status(200).json(tasks);
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err });
    }
};

// UPDATE a task by ID
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.userId },
            updates,
            { new: true }
        );

        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.status(200).json({ message: "Task updated", task });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err });
    }
};

// TOGGLE status (e.g., "todo" -> "done")
export const toggleStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOne({ _id: id, userId: req.userId });
        if (!task) return res.status(404).json({ message: "Task not found" });

        // simple cycle toggle (optional logic)
        const nextStatus = {
            todo: "in-progress",
            "in-progress": "done",
            done: "todo",
        }[task.status] || "todo";

        task.status = nextStatus;
        await task.save();

        return res.status(200).json({ message: "Status updated", task });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err });
    }
};

// DELETE a task
export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });
        if (!task) return res.status(404).json({ message: "Task not found" });

        return res.status(200).json({ message: "Task deleted" });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err });
    }
};
