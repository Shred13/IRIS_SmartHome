const SpotifyWebApi = require('spotify-web-api-node');
const {spotCredsId, spotCredsSec} = require('./config');
const request = require('request');


request({url:'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg', headers:{"Authorization":'Bearer ' + 'BQBG17vmO2gc--Nm98DiuIa3WbCWLH503-rYNIo5DMXF0QS5Mnp6evnxz7Qmk4kNkiERKxtS70_agwY5rA1fA8stcY8jkr1M2K3tonXsVGBsSlXQTm2KWX4ZISrSmuuDkxswK-SXOxI9WTfKVP4SVhh-LETy'}}, function (error, body){
//     console.log(body)
console.log(JSON.parse(body.body))
});


// var spotifyApi = new SpotifyWebApi({
//     clientId: spotCredsId,
//     clientSecret: spotCredsSec,
//     // redirectUri: 'http://localhost:3000/endpoint/'
// });
// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//     function(data) {
//         console.log('Artist albums', data.body);
//
//     },
//     function(err) {
//         console.error(err);
//     }
// );
