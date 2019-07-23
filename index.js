const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {googleMaps} = require('./config');
const request = require('request');
const fb = require('./fb');
// const { endpoint, masterKey, port } = require(‘./config’);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

http.createServer(app).listen(3000, ()=>{
    console.log('Listening on port 3000')
});

let recepID ="";

function mapSearch (){
    request.get('https://maps.googleapis.com/maps/api/directions/json?origin=44.225916,-76.514490&destination=44.227959,-76.495649&transit_mode=bus&mode=transit&key='+googleMaps, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', JSON.parse(body)['routes']); // Print the HTML for the Google homepage.
        let JSONified = JSON.parse(body);
        let routes = JSONified['routes'][0]['legs'][0]['steps'];
        let arrOfRoutes=[];
        for (let i =0; i<routes.length; i++){
            if ("transit_details" in routes[i]){
                arrOfRoutes.push(routes[i]);
            }
        }
        console.log(arrOfRoutes[0]['transit_details']['line']['short_name']);

        // let arrOfFinalRoutes = [];
        for (let o = 0; o < arrOfRoutes.length; o++) {
            // arrOfFinalRoutes.push([arrOfRoutes[o]['transit_details']["departure_time"]['text'], arrOfRoutes[o]['transit_details']['line']['short_name']]);
            fb.sendMessage(recepID, ("Bus # " + arrOfRoutes[o]['transit_details']['line']['short_name']+ " is leaving from " + arrOfRoutes[o]['transit_details']['departure_stop']['name'] + " at " + arrOfRoutes[o]['transit_details']["departure_time"]['text']))
        }



        // console.log(arrOfFinalRoutes);
        // console.log(routes)

        // for (let i =0; i<)
    });
}

app.post('/endpoint',(req, res) => {
    recepID = req.body['originalDetectIntentRequest']['payload']['data']['sender']['id'];
    let text = req.body['queryResult']['queryText'];
    let action = req.body['queryResult']['action'];
    let parameters = req.body['queryResult']['parameters'];
    console.log(action, parameters);
    if(action === 'busTo'){
        fb.sendMessage(recepID, "Looking for the bus");
        mapSearch();
    }
});