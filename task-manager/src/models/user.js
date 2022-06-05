const mongoose = require('mongoose');
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        'type': String,
        'required': true,
        'trim': true
    },
    email: {
        'type': String,
        'required': true,
        'trim': true,
        'unique': true,
        'lowercase': true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    password: {
        'type': String,
        'required': true,
        'trim': true,
        'minlength':7,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("password is not strong");
            }
        }
    },
    age: {
        'type': Number,
        'default':0,
        validate(value) {
            if (value <= 0) {
                throw new Error("Age must be positive numbers");
            }
        }
    },
    tokens: [
        {
            token: {
                'type': String,
                'required': true
            }
        }
    ],
    avatar: {
        'type': Buffer
    }
}, {
    timestamps: true
});

userSchema.virtual('tasks', {
    'ref': 'Task',
    'localField': '_id',
    'foreignField': 'owner'
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
}

userSchema.statics.findByIdAndCredentials = async (email, password) =>  {
    console.log(email);
    console.log(password);
    const user = await User.findOne({email});

    if (!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(isMatch);

    if (!isMatch) {
        throw new Error("Unable to login");
    }

    return user;
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    console.log(user.password);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
