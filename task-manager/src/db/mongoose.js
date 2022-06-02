const mongoose = require('mongoose');
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';
const validator = require('validator');

mongoose.connect(connectionURL, {
    'useNewUrlParser': true
});


// const Task = mongoose.model('Task', {
//     description:{
//         'type': String,
//         'required': true,
//         'trim': true
//     },
//     completed: {
//         'type': Boolean,
//         'default': true
//     },
// });


// const task = new Task({
//     description:"  Hi New Abhijeet111  ",
//     completed: true,
// });

// task.save().then(() => {
//     console.log("Success");
// }).catch((error) => {
//     console.log(error);
// });
    