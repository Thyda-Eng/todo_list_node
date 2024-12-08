// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TaskList from './components/Task/TaskList';
import TaskForm from './components/Task/TaskForm';
import LoginForm from './components/Login/LoginForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(()=> localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/task', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    setTasks([task, ...tasks]);
  };

  return (
    <>
      <div className="flex justify-center my-4">
        <div className="w-1/2">
          <h4 className="text-lg text-center font-bold uppercase">Todo List</h4>
          {token ? (
            <>
              <div className='flex justify-between items-center my-4'></div>
              <button onClick={logout} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
                Logout
              </button>
              <TaskForm addTask={addTask} />
              <TaskList tasks={tasks} setTasks={setTasks} />
            </>
          ) : (
            <LoginForm setToken={setToken}/>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
