import React, { useState, useEffect } from 'react';
import { api, setAuthToken, fetchCsrfToken } from './Api';
import TaskList from './components/Task/TaskList';
import TaskForm from './components/Task/TaskForm';
import LoginForm from './components/Login/LoginForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(()=> localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      setAuthToken(token); 
      fetchTasks();
    }
  }, [token, setAuthToken]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
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
              <div className="flex justify-end">
                <button onClick={logout} className="bg-transparent hover:bg-gray-500 text-gray-700 
                                      font-semibold hover:text-white py-2 px-4 border border-gray-500 
                                      hover:border-transparent rounded">
                  Logout
                </button>
              </div>
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
