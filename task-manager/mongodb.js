//const mongodb = require('mongodb');
const {MongoClient, ObjectId} = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log("Unable to connect with db");
    }



    const db = client.db(databaseName);
    db.collection('users').insertOne({
        '_id': id,
        'name': 'Abhijeet12121l',
        'age': 31
    }, (error, result) => {
        if (error) {
            console.log("Unable to insert");
        }

        console.log(result);
    });

    // db.collection('users').findOne({'name':'Abhijeet New'}, (error, users) => {
    //     if (error) {
    //         console.log("Unable to find");
    //     }

    //     console.log(users);
    // });

    // db.collection('users').find({'name':'Abhijeet'}).toArray((error, users) => {
    //     if (error) {
    //         console.log("Error");
    //     }

    //     console.log(users);
    // });

//  db.collection('users').updateOne({
//         '_id': new ObjectId('623324a15c9955c0b909fd56')
//     }, {
//         '$set': {
//             'name': 'Mike'
//         }
//     }).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error);
//     });

    db.collection('users').deleteMany({
        'age': 31
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })



    // db.collection('users').insertMany([{
    //     'name': 'Abhijeet',
    //     'age': 31
    // },{
    //     'name': 'Abhijeet New',
    //     'age': 31
    // }], (error, result) => {
    //     if (error) {
    //         console.log("Unable to insert");
    //     }

    //     console.log(result);
    // });

    // db.collection('tasks').insertMany([{
    //     'description': 'Todays work',
    //     'completed': 0
    // },{
    //     'description': 'Tomorrow work',
    //     'completed': 1
    // },
    // {
    //     'description': 'Yesterday work',
    //     'completed': 0
    // }], (error, result) => {
    //     if (error) {
    //         console.log("Unable to insert");
    //     }

    //     console.log(result);
    // });

})