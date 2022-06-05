const express = require("express");
const router = new express.Router();

const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require("multer");
const sharp = require('sharp');

const upload = multer({
    'limits': {
        'fileSize': 1000000
    },
    fileFilter(req, file, cb) {
        console.log(file.originalname);
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("File type must be PNG"));
        }
        // cb(new Error("File type must be PDF"));
        cb(undefined, true);
        // cb(undefined, true);
    }
});

router.get('/test', (req, res) => {
    res.send("working fine");
});

router.post('/users/login', async (req, res) => {
    const user = new User(req.body);
    try {
        const user = await User.findByIdAndCredentials(req.body.email, req.body.password);
        const token  = await user.generateAuthToken();
        console.log(token);
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

router.patch('/users/me', auth, async (req, res) => {
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
    
        updates.forEach((update) => {
            console.log(req.user);
            req.user[update] = req.body[update];
        });

        
        await req.user.save();

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {'new': true, runValidators:true});
        
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/user/me', auth, async (req, res) => {
    try {
        await req.user.deleteOne();
        console.log("gggdf");
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }

});

router.get('/user/:id', auth, async (req, res) => {
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

const errorMiddleware = (req, res, next) => {
    throw new Error("Erorr from my middleware");
}

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({'width': 250, 'height': 250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({'error': error.message});
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

router.get('/users/:id/avatar', auth, async (req, res) => {
    try {
        const user =  await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error("Avatar not found");
        }

        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar);
    } catch(e) {
        res.status(404).send(e);
    }
})

module.exports = router;