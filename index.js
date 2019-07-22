const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {fbACCESS} = require('./config');
const fb = require('./fb');
// const { endpoint, masterKey, port } = require(‘./config’);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

http.createServer(app).listen(3000, ()=>{
    console.log('Listening on port 3000')
});

app.post('/endpoint',(req, res) => {
    recepID = req.body['originalDetectIntentRequest']['payload']['data']['sender']['id'];
    let text = req.body['queryResult']['queryText'];
    let action = req.body['queryResult']['action'];
    let parameters = req.body['queryResult']['parameters'];
    console.log(action, parameters);
    if(action == 'busTo'){
        fb.sendMessage(recepID, "Looking for the bus");
    }
});