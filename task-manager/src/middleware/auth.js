const User = require('../models/user');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({'_id': decode._id, 'tokens.token': token});

        if (!user) {
            res.status(403).send({error: "Invalid creds"});
        }

        console.log(user.id);

        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(403).send({error: "Please do authorization"});
    }
    
}

module.exports = auth;