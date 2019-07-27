const SpotifyWebApi = require('spotify-web-api-node');
const {spotCredsId, spotCredsSec} = require('./config');
const request = require('request');

let uriSpot = "http://localhost:3000/call";


// request({url:'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg', headers:{"Authorization":'Bearer ' + 'BQBG17vmO2gc--Nm98DiuIa3WbCWLH503-rYNIo5DMXF0QS5Mnp6evnxz7Qmk4kNkiERKxtS70_agwY5rA1fA8stcY8jkr1M2K3tonXsVGBsSlXQTm2KWX4ZISrSmuuDkxswK-SXOxI9WTfKVP4SVhh-LETy'}}, function (error, body){
// //     console.log(body)
// console.log(JSON.parse(body.body))
// });

// request({url:'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg', headers:{"Authorization":'Basic ' + new Buffer.from(spotCredsId+":"+spotCredsSec).toString('base64')}}, function (error, body){
// //     console.log(body)
//     console.log(JSON.parse(body.body))
// });

// var spotifyApi = new SpotifyWebApi({
//     clientId: spotCredsId,
//     clientSecret: spotCredsSec,
//     redirectUri: 'https://google.com'
// });
// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//     function(data) {
//         console.log('Artist albums', data.body);
//
//     },
//     function(err) {
//         console.error(err);
//
//     }
// );
//
// console.log('https://accounts.spotify.com/authorize?client_id='+spotCredsId+'&scopes=playlist-read-private&response_type=code&redirect_uri=https%3A%2F%2Fwww.google.com%2F')
// console.log(spotCredsId+":"+spotCredsSec);
// console.log(new Buffer.from(spotCredsId+":"+spotCredsSec).toString('base64'));

request.get({url:'https://accounts.spotify.com/authorize?client_id='+spotCredsId+'&scopes=playlist-read-private&response_type=code&redirect_uri=' + uriSpot}, function (err, body) {
    console.log(Object.keys(body));
    console.log(body['connection'])
});

// request.post('https://accounts.spotify.com/api/token', {
//     todo:'AQDE_sudZbHEp9jJf7mU-lh8DS7pyfnuhx1irZ4kQT_flJvDrXORzkedCt-nt-6QtDvGywnLjyF8I9In1qy-43lYQvyLENAKAh5YAfJp7d-Nb-8SvefXqY4lTsCdnL5aHr7QHaOqLjSw0HWeI2T9ZAFrCz5ULXltKSH02O4wQf5l3FR_V6RCjpjNnxDC3VqN198'
// });