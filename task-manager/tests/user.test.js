const { default: mongoose } = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const User = require('../src/models/user');
const { findById } = require('../src/models/user');
const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    "_id": userOneId,
    "name":"New New Abhijeet1",
    "email":"abhijeet@fg.ininnewyahoo",
    "password":"Abhijeet@123",
    "age":"34",
    "tokens": [
        {
            "token": jwt.sign({'_id': userOneId}, process.env.JWT_SECRET)
        }
    ]
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
})

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        "name":"New New Abhijeet1112322222",
        "email":"abhijeet@fg.ininnewgmailyahoo",
        "password":"Abhijeet@123",
        "age":"34"
    }).expect(200);

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
});

test('Login existing user', async() => {
    await request(app).post('/users/login').send({
        "email": "abhijeet@fg.ininnewyahoo",
        "password": "Abhijeet@123"
    }).expect(200);
});

test('Shoould get the user profile', async () => {
    await request(app)
        .get('users/me')
        .set('Autorization', `Bearer ${userOne.tokens[0]['token']}`)
        .send()
        .expect(200)
})