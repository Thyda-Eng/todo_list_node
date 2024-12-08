import React, { useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskEdit from './TaskEdit';

export default function TaskList({ tasks, setTasks, handleEditTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskInput, setTaskInput] = useState('');

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`http://localhost:5000/task/${id}/status`, {completed: completed} );
    updateTaskStatus(id, completed);
  }

  const updateTaskStatus = (id, completed) => {
    setTasks(tasks =>
      tasks.map(task => (task._id === id ? { ...task, completed } : task))
    );
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setTaskInput(task.title);
  };

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleUpdateTask = async (id) => {
    try {
      const updatedTask = { title: taskInput }; // You can add more fields if needed
      await axios.patch(`http://localhost:5000/task/${id}`, updatedTask);
      updateTaskTitle(id, taskInput)
      resetEditingState();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const updateTaskTitle = (id, title) => {
    setTasks(tasks =>
      tasks.map(task => (task._id === id ? { ...task, title } : task))
    );
  };

  const resetEditingState = () => {
    setEditingTaskId(null);
    setTaskInput('');
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/task/${id}`);
      removeTaskFromList(id);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const removeTaskFromList = (id) => {
    setTasks(tasks => tasks.filter(task => task._id !== id));
  };

  return (
    <div className="divide-y divide-dashed">
      {tasks.map(task => (
          <div key={task._id}>
            {editingTaskId === task._id ? (
              <TaskEdit
                  taskInput={taskInput}
                  onInputChange={handleInputChange}
                  onSave={() => handleUpdateTask(task._id)}
                  onCancel={() => setEditingTaskId(null)}
              />
            ) : (
              <TaskItem
                  task={task}
                  onEditClick={() => handleEditClick(task)}
                  onDeleteClick={() => handleDeleteClick(task._id)}
                  toggleComplete={() => toggleComplete(task._id, !task.completed) }
              />
            )}
          </div>
      ))}
    </div>
  );
}
