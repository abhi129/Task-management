const express = require("express");
const router = new express.Router();

const Task = require('../models/task');
const auth = require('../middleware/auth');

router.post('/task', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        'owner':req.user._id
    });
    try {
        console.log(req.user._id);
        await task.save()
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/tasks', auth, async (req, res) => {
    let completed = false;
    let skip = 0;
    let limit = 1;
    let sortByField = '';
    let sortByOrder = '';
    if (req.query.completed) {
        completed = req.query.completed;
        skip =  parseInt(req.query.skip);
        limit = parseInt(req.query.limit)
    }

    let sortBy = sortByField.split(':');
    sortByField = sortBy[0];
    sortByOrder = sortBy[1];
    console.log(skip);
    
    try {
        const task = await Task.find({'completed': completed}).limit(limit).skip(skip).sort({
            sortByField: sortByOrder
        });
        // await req.user.populate({
        //     'path': 'tasks',
        //     'match': {
        //         completed: true
        //     }
        // }).execPopulate();

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/task/:id', auth, async (req, res) => {
    console.log(req.params);
    const _id = req.params['id'];
    try {
        const task = await Task.findOne({_id, 'owner': req.user._id});
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