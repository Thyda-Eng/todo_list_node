import React, { useState } from 'react';
import { api, fetchCsrfToken } from './../../Api';

export default function TaskForm({addTask}) {
  const [title, setTitle] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const csrfToken = await fetchCsrfToken();
    try {
      const response = await api.post('/tasks', { title }, {
        headers: {
          'X-CSRF-Token': csrfToken,
        },
      }); 
      const newTask = response.data;
      addTask(newTask);
      setTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  return (
    <>
      <form className="pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="flex -mx-2 justify-between items-center">
          <div className="flex items-center w-5/6 px-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex w-1/6 px-2 justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
