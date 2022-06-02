// const request = require('request');

const request = require("request");
const geoCode = require("./utils/geocode");
const weather = require("./utils/weather");

// const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWJoaTEyOSIsImEiOiJja3p6dG1vZTUwMjhpM2ptb2M0MG1sd2p3In0.2ag8JynHa-nrFYijBjOj3Q&limit=1';



// request({'url': mapBoxUrl, json:true}, (error, response) => {
//     //const data = JSON.parse(response.body);
//     console.log(response.body.features[0].center);
//     const lat = response.body.features[0].center[0];
//     const lon = response.body.features[0].center[1];
// });

// const url = `http://api.weatherstack.com/current?access_key=25e02146eb401fbc1c0e51ce65548649&query=${lat},${lon}&units=f`;

// request({'url': url, json:true}, (error, response) => {
//     //const data = JSON.parse(response.body);
//     console.log(response.body.current);
// });

const address = process.argv[2];

if (!address) {
    console.log("please provide address");
} else {
    geoCode(address, (error, {latitude, longitude}) => {
        if (error) {
            console.log('Error', error);
            return;
        }
    
        //console.log('Response', data);
        weather(latitude, longitude, (error, data) => {
            if (error) {
                console.log('Error', error);
                return;
            }
            
            console.log("Error: ", error)
            console.log("Response", data);
        })
    })

}


