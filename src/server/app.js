var express = require('express');
const path = require('path');
var app = express();

var request = require('request');

var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://nmahxyjo:JYYPO0t3Byx6gy7YWCWtd0CBsvNCnXu1@rogue.db.elephantsql.com:5432/nmahxyjo");


global.fetch = require("node-fetch");


app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});


app.get('/weather', async (req, res) => {
    console.log('fetching... req = ', req.query);
    return fetchCity(req.query.name, (resp) => {
        res.status(200).send(resp)
    });
});

app.get('/weather/coordinates', async (req, res) => {
    console.log('fetching coords... req = ', req.query);
    return fetchCoords(req.query.lon, req.query.lat, (resp) => {
        res.status(200).send(resp)
    });
});

app.get('/favourites', async (req, res) => {
    console.log('getting favourites... req = ', req.query);
    db.any("SELECT * FROM cities;").then((data) => {
        res.send(data);
    })
});

app.post('/favourites', async (req, res) => {
    console.log('adding favourite... req = ', req.query);


    db.none('INSERT INTO Cities("timeAdded", name) VALUES($1, $2)', [req.query.timeAdded, req.query.name])
        .then(result => {
            res.status(200).send(result);
        }).catch((error) => {
        console.log(error);
        res.status(400).send("Error occurred");
    });


});

app.delete('/favourites', function (req, res) {
    console.log('deleting... req = ', req.query);
    db.none('Delete from cities where "timeAdded" = $1', req.query.timeAdded).then(
        () => res.status(200).send()
    ).catch((error) => {
        res.status(400).send("There is no such city");
    })
});

app.listen(3003, function () {
    console.log('Example app listening on port 3003!');
});

const ApiKey = '982553b8d730dcb96e93d24aa490d4fe';

async function fetchCity(cityName, handler) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + ApiKey + '&units=metric';
    console.log('trying url =', url);
    request.get(url, function (error, response, body) {
        console.log('statusCode:', response && response.statusCode);
        handler(body);
    });
}

async function fetchCoords(longitude, latitude, handler) {
    console.log(longitude, latitude);
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + ApiKey + '&units=metric';
    request.get(url, function (error, response, body) {
        console.log('statusCode:', response && response.statusCode);
        handler(body);
    });
}
