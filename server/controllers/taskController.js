import Task from "../models/taskModel.js";

export const getAllTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await Task.find({userId}).sort({ createdAt: -1 }).exec();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tasks");
  }
};

export const createTask = async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      completed: false,
      userId: req.userId
    });
    const result = await newTask.save();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = { title: req.body.title };
    const task = await Task.findOneAndUpdate({ _id: taskId }, updates, { new: true });
    if (!task) {
      return res.status(404).send("Task not found");
    } 
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const updates = { completed: req.body.completed };
    const task = await Task.findOneAndUpdate(query, updates, { new: true });
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
};

export const deleteTask = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    await Task.deleteOne(query);
    res.status(200).send("Task deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
};