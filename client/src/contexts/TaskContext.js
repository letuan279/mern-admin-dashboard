// AuthContext.js
import React, { createContext, useState } from 'react';
import { fetchTasks, fetchCase } from 'services/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [currentCase, setCurrentCase] = useState(null);

    const getAllTasks = async () => {
        try {
            const res = await fetchTasks();
            if (res.success !== true) {
                alert('Error fetching tasks: ');
                console.log('Error fetching tasks: ', res.message);
                return;
            }
            setTasks(res.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    const getCase = async (id) => {
        try {
            const res = await fetchCase(id);
            if (res.success !== true) {
                alert('Error fetching case');
                console.log('Error fetching case: ', res.message);
                return;
            }
            setCurrentCase(res.data);
        } catch (error) {
            console.error('Error fetching case:', error);
        }
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            setTasks,
            getAllTasks,
            getCase,
            currentCase,
            setCurrentCase
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;