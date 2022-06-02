require('../src/db/mongoose');
const User = require('../src/models/user');

//624f201a4d699ebcdaf310ca

User.findByIdAndUpdate('625efff9fd70ff197a948df1', {'age': 1}).then((user) => {
    console.log(user);
    return User.countDocuments({'age':1})
}).then((user) => {
    console.log(user);
}).catch((e) => {
    console.log(e);
})

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return count;
}


updateAgeAndCount('625efff9fd70ff197a948df1', 1).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
}) 
