import React, { useState } from 'react';
import axios from 'axios';
import { fetchCsrfToken } from '../../Api';

export default function TaskForm({addTask}) {
  const [title, setTitle] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const csrfToken = await fetchCsrfToken(); // Fetch CSRF token
    const token = localStorage.getItem('token');
    try {
      const response =  await axios.post('http://localhost:5000/task', { title }, {
                          headers: {
                              'X-CSRF-Token': csrfToken, // Include CSRF token in header
                              'Authorization': `Bearer ${token}`,
                              'Content-Type': 'application/json'                
                          },
                          withCredentials: true, // Send cookies with the request
                      });
      console.log('+++++++++++++++++++ task submit+++++++++++++');
      const newTask = response.data; // Adjust this based on your server response structure
      console.log('Task submitted:', newTask);
      addTask(newTask);
      setTitle('');
    } catch (error) {
        console.error('Error adding task:', error);
    }
  }

  return (
    <>
      <form className="pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="flex -mx-2">
          <div className="w-5/6 px-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-1/6 px-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
