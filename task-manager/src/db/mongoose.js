const mongoose = require('mongoose');
const connectionURL = process.env.MONGODB_URL;
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
    