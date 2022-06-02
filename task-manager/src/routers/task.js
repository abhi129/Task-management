const express = require("express");
const router = new express.Router();

const Task = require('../models/task');

router.post('/task', async (req, res) => {
    console.log(req.body);
    const task = new Task(req.body);
    try {
        await task.save()
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/tasks', async (req, res) => {
    console.log(req.body);
    try {
        const task = await Task.find();
        if (!task) {
            res.status(404).send();
            return;
        }
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/task/:id', async (req, res) => {
    console.log(req.params);
    const _id = req.params['id'];
    try {
        const task = await Task.findById(_id);
        if (!task) {
            res.status(404).send();
            return;
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;