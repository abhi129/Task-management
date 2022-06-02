const request = require('request');

const weather = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=25e02146eb401fbc1c0e51ce65548649&query=${lat},${lon}&units=f`;
    request({url: url, json:true}, (error, response) => {
        if (error) {
            callback("Unable to connect with net", undefined);
        } else if (response.body.success === false) {
            callback("Wornge lat or lon", undefined);
        } else {
            callback(undefined, response.body.location);
        }
    })
}

module.exports = weather;