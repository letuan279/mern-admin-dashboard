import React, { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import TaskContext from 'contexts/TaskContext';
import PieChartCard from "views/admin/default/components/PieChartCard";
import AddSubtaskModal from './AddSubtaskModal';  // Adjust the import path accordingly

const CaseDetail = () => {
    const { id } = useParams();
    const { currentCase, getCase } = useContext(TaskContext);
    const [darkmode, setDarkmode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useLayoutEffect(() => {
        getCase(id);
    }, [id]);

    if (!currentCase) {
        return <p>Loading...</p>;
    }

    const { "hunting-task": huntingTask, desc, date, subtasks } = currentCase;
    const formattedDate = new Date(date).toLocaleDateString();

    const colors = ["#6AD2FF", "#FF6AD2", "#D26AFF", "#FFD26A", "#6AFFA2"];
    const pieData = subtasks.map((subtask, index) => ({
        label: subtask.subtask,
        value: subtask.quantity,
        color: colors[index % colors.length],
    }));

    const handleAddSubtask = (newSubtask) => {
        // Handle adding the new subtask to the subtasks list or to the backend
        console.log(newSubtask);
    };

    return (
        <div className={`mt-8 p-4 bg-white shadow rounded-lg ${isModalOpen ? 'backdrop-blur-sm' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-4">{huntingTask}</h1>
                    <p className="text-gray-700 mb-2">{desc}</p>
                    <p className="text-gray-500 mb-2">Date: {formattedDate}</p>
                    <p className="text-gray-500 mb-2">Number of Subtasks: {subtasks.length}</p>
                    {subtasks.length > 0 ? (
                        <ul className="list-disc ml-5 mt-2">
                            {subtasks.map((subtask, index) => (
                                <li key={index} className="text-gray-700">
                                    {subtask.subtask}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 mt-2">No subtasks available.</p>
                    )}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md"
                    >
                        Add Subtask
                    </button>
                </div>
                <div>
                    <PieChartCard data={pieData} />
                </div>
            </div>
            <AddSubtaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddSubtask={handleAddSubtask}
            />
        </div>
    );
};

export default CaseDetail;
