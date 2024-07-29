const mongoose = require('mongoose');

const SubTaskSchema = new mongoose.Schema({
    "subtask": {
        type: String,
        required: true
    },
    "subtask-id": {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }
}, {
    timestamps: true
});

const SubTask = mongoose.model('SubTask', SubTaskSchema);
module.exports = SubTask;