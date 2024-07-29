const Task = require('../models/Task');
const SubTask = require('../models/SubTask');
const mongoose = require('mongoose');

const getAllTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId }).populate('subtasks');
        res.status(201).json({
            success: true,
            message: 'Tasks fetched successfully',
            data: tasks
        });
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: 'Server error',
            data: null
        });;
    }
}

const getOneCase = async (req, res) => {
    try {
        const userId = req.user._id;
        const taskId = new mongoose.Types.ObjectId(req.params.id);
        const task = await Task.findOne({ _id: taskId, user: userId }).populate('subtasks');
        if (!task) {
            return res.json({
                success: false,
                message: 'Task not found',
                data: null
            });
        }
        res.status(201).json({
            success: true,
            message: 'Task fetched successfully',
            data: task
        });
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: 'Server error',
            data: null
        });
    }
}

module.exports = {
    getAllTasks,
    getOneCase
};