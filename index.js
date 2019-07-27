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

function mapSearch(parameters){
    let dest = "";
    if (parameters['Common_Kingston']===''){
        if (parameters['location']!==''){
            let toFormat = parameters['location']['street-address'];
            let destAlmost = toFormat.replace(new RegExp(" ", "g"), "+");
            dest = destAlmost+"+Kingston+ON"
        }
        else{
            fb.sendMessage(recepID, "Sorry, could not find a bus to that place");
            return;
        }
    }
    else if(parameters['Common_Kingston']==='Botterall'){
        dest = "44.224407,-76.491671"
    }
    else if(parameters['Common_Kingston']==='Brant Hall'){
        dest = "44.223591,-76.499949"
    }
    else if(parameters['Common_Kingston']==='Goodwin Hall'){
        dest = "44.228043,-76.492341"
    }
    else if(parameters['Common_Kingston']==='Home'){
        dest = "44.225909,-76.514474"
    }
    else if(parameters['Common_Kingston']==='Isabel Bader'){
        dest = "44.220726,-76.506287";
    }
    else if(parameters['Common_Kingston']==='Main'){
        dest = "44.228032,-76.495519";
    }
    else if(parameters['Common_Kingston']==='Stirling'){
        dest = "44.224615,-76.497733"
    }
    else if(parameters['Common_Kingston']==='Victoria Hall'){
        dest = "44.225386,-76.498491"
    }
    else if(parameters['Common_Kingston']==='West Campus'){
        dest = "44.223289, -76.514123"
    }
    mapSearchHelper(dest)
}

function mapSearchHelper (dest, loc){
    request.get('https://maps.googleapis.com/maps/api/directions/json?origin=44.225916,-76.514490&destination=' + dest + '&transit_mode=bus&mode=transit&key='+googleMaps, function (error, response, body) {
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
        // console.log(arrOfRoutes[0]['transit_details']);

        // let arrOfFinalRoutes = [];
        if (arrOfRoutes.length>0) {
            for (let o = 0; o < arrOfRoutes.length; o++) {
                fb.sendMessage(recepID, ("Bus # " + arrOfRoutes[o]['transit_details']['line']['short_name'] + " is leaving from " + arrOfRoutes[o]['transit_details']['departure_stop']['name'] + " at " + arrOfRoutes[o]['transit_details']["departure_time"]['text'] + ". You will reach " + arrOfRoutes[o]['transit_details']["arrival_stop"]['name'] + " at " + arrOfRoutes[o]['transit_details']["arrival_time"]['text'] + "(Total of " + arrOfRoutes[o]['transit_details']["num_stops"] + " stops)."))
            }
        }
        else{
            fb.sendMessage(recepID, "No bus there sorry, (might not exist!)")
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
        mapSearch(parameters);
    }
});

//todo look into adding to the bus so that the user location can change and it will still work. Maybe can extract from messenger some how? Do it after spotify tho