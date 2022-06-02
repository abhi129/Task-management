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

// app.use((req, res, next) => {
//     console.log(req.method, req.path);
//     next();
// })

// app.use((req, res, next) => {
//     res.status(503).send();
// });

const port =  process.env.PORT || 3001;
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log("Server is up on port" + port);
});
app.use(userRouter);
app.use(taskRouter);
const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const token = jwt.sign({_id: "abhijeet"}, "mynewtoken", {'expiresIn': '7 days'});
    const data = jwt.verify(token, "mynewtoken");
    console.log(data);
}

myFunction();
