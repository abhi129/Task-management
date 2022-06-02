const express = require("express");
const router = new express.Router();

const User = require('../models/user');
const auth = require('../middleware/auth');

router.get('/test', (req, res) => {
    res.send("working fine");
});

router.post('/users/login', async (req, res) => {
    const user = new User(req.body);
    try {
        const user = await User.findByIdAndCredentials(req.body.email, req.body.password);
        console.log(user);
        const token  = await user.generateAuthToken();
        res.send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });

        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token  = await user.generateAuthToken();
        res.send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.patch('/users/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        res.status(500).send({'error': 'Invalid update'});
        return;
    }

    console.log(req.body);
    console.log(req.params.id);
    try {
        const user = await User.findById(req.params.id);
    
        updates.forEach((update) => {
            user[update] = req.body[update];
        });

        
        await user.save();

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {'new': true, runValidators:true});
        if (!user) {
            res.status(404).send(e);
        }
        
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/users/:id', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send()
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }

});

router.get('/users/:id', auth, async (req, res) => {
    console.log(req.params);
    const _id = req.params['id'];
    try {
        const user = await User.find({'_id':_id});
        if (!user) {
            res.status(404).send();
            return;
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;