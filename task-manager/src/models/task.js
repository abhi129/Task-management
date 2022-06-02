const mongoose = require('mongoose');
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';
const validator = require('validator');

const Task = mongoose.model('Task', {
    description:{
        'type': String,
        'required': true,
        'trim': true
    },
    completed: {
        'type': Boolean,
        'default': true
    }
});

module.exports = Task;