import React from 'react';

export default function TaskItem({ task, onEditClick, onDeleteClick, toggleComplete }) {
  return (
    <div className="flex py-3 justify-between items-center">
        <div className="flex items-center w-2/3">
            <input
                className="mr-3"
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task._id, !task.completed)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
            </span>
        </div>
        <div className="flex space-x-2 w-1/3 justify-end">
            <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={onEditClick}
            >
                Edit
            </button>
            <button
                className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={onDeleteClick}
            >
                Delete
            </button>
        </div>
    </div>
  )
}
