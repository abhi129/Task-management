const request = require("request");

const geoCode = (address, callback) => {
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWJoaTEyOSIsImEiOiJja3p6dG1vZTUwMjhpM2ptb2M0MG1sd2p3In0.2ag8JynHa-nrFYijBjOj3Q&limit=1';
    request({url: mapBoxUrl, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect with location service", undefined);
        } else if (response.body.features.length === 0) {
            callback("Unable to connect for this location try another location", undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geoCode;