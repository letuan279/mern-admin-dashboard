const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    "hunting-task": {
        type: String,
        required: true
    },
    "hunting-task-id": {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    subtasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTask'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;