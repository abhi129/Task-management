const express = require("express");
const bodyParser = require("body-parser");
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const { findByIdAndDelete } = require("./models/user");
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const jwt = require('jsonwebtoken');

const app = express();

const multer = require('multer');

const upload = multer({
    dest: 'images'
});

const port =  3001;
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);
app.use(taskRouter);
const bcrypt = require('bcryptjs');

module.exports = app;
