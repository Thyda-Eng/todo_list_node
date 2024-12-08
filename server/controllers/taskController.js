import Task from "../models/taskModel.js";
import { findTaskAndAuthorize } from '../helpers/taskHelper.js';

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
    const { task, error } = await findTaskAndAuthorize(taskId, req.userId);
    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = { completed: req.body.completed };
    const { task, error } = await findTaskAndAuthorize(taskId, req.userId);
    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { task, error } = await findTaskAndAuthorize(taskId, req.userId);
    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

    await Task.deleteOne({_id: taskId});
    res.status(200).send("Task deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
};