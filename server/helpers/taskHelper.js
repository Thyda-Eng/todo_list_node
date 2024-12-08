import Task from '../models/taskModel.js';

export const findTaskAndAuthorize = async (taskId, userId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    return { error: { status: 404, message: "Task not found" } };
  }
  if (task.userId.toString() !== userId) {
    return { error: { status: 403, message: "You are not authorized to access this task" } };
  }
  return { task };
};