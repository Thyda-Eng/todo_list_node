import React, { useState, useEffect } from 'react';
import { api, fetchCsrfToken } from './../../Api';
import TaskItem from './TaskItem';
import TaskEdit from './TaskEdit';

export default function TaskList({ tasks, setTasks, handleEditTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskInput, setTaskInput] = useState('');
  const [csrfToken, setCsrfToken] = useState(''); 

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const csrfToken = await fetchCsrfToken();
        setCsrfToken(csrfToken); 
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    fetchToken();
  }, []);
  const toggleComplete = async (id, completed) => {
    const response = await api.put(`/tasks/${id}/status`, { completed: completed }, {
      headers: {
        'X-CSRF-Token': csrfToken,
      },
    });
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
      const updatedTask = { title: taskInput };
      const response = await api.patch(`/tasks/${id}`, updatedTask, {
        headers: {
          'X-CSRF-Token': csrfToken,
        },
      });
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
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if(isConfirmed){
      try {
        const response = await api.delete(`/tasks/${id}`, {
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        });
        removeTaskFromList(id);
      } catch (error) {
        console.error("Error updating task:", error);
      }
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
