const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Create Task
router.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Task
router.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

