import React, { useState } from 'react';

const SubtaskDetail = ({ isOpen, onClose, onAddSubtask }) => {
    const [subtask, setSubtask] = useState('');
    const [type, setType] = useState('Windows');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddSubtask({ subtask, type, file });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg z-10">
                <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
                    &times;
                </button>
                <h2 className="text-2xl mb-4">Add New Subtask</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subtask Name</label>
                        <input
                            type="text"
                            value={subtask}
                            onChange={(e) => setSubtask(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <div className="mt-1 flex space-x-2">
                            {['Windows', 'Linux'].map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setType(option)}
                                    className={`px-4 py-2 rounded-md ${
                                        type === option
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload File</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md">
                            Add Subtask
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubtaskDetail;
