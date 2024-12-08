import React from 'react';

export default function TaskEdit({ taskInput, onInputChange, onSave, onCancel }) {
    return (
        <div className="flex py-3">
            <div className="w-2/3 space-x-2">
                <input
                    type="text"
                    value={taskInput}
                    onChange={onInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="w-1/3 px-2 space-x-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onSave}
                >
                    Save
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};
