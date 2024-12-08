import express from "express";
import {Task, User} from "../db/client.js";
import { authenticate } from "./authMiddleware.js";

import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 }).exec();
  console.log(tasks);
  res.send(tasks).status(200);
});

router.get("/:id", authenticate, async (req, res) => {
  let query = { id: new ObjectId(req.params.id) };
  let result = await Task.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", authenticate, async (req, res) => {
  try {
    let newTask = new Task({
      title: req.body.title,
      completed: false,
    });
    let result = await newTask.save();
    res.status(201).json(result);
    // res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = { title: req.body.title};
    const task = await Task.findOneAndUpdate(query, updates, {new: true});
    res.send(task).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

router.put("/:id/status", authenticate, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = { completed: req.body.completed};
    const task = await Task.findOneAndUpdate(query, updates, {new: true});
    res.send(task).status(200);
  } catch (err) {
    res.status(500).send("Error updating record");
  }
});


router.delete("/:id", authenticate, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let task = await Task.deleteOne(query);
    res.send(task).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
