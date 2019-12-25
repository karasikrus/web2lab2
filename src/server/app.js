var express = require('express');
const path = require('path');
var app = express();

var request = require('request');

var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://xsnhszrr:zwgWkCogMRFkyetzCKBV_1EF_kzbWuEF@balarama.db.elephantsql.com:5432/xsnhszrr");

global.fetch = require("node-fetch");

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/weather', async (req, res)  => {
    return fetchCity(req.query.city, (resp)=>{res.status(200).send(resp)});
});

app.get('/weather/coordinates', async (req, res) =>{
    return fetchCoords(req.query.lon, req.query.lat, (resp)=>{res.status(200).send(resp)});
});

app.get('/favourites', async (req, res) =>{
    db.many("SELECT * FROM cities;").then((data)=>{res.send(data);})
});

app.post('/favourites', async (req, res) => {
    fetchCity(req.query.name, function(response){
        console.log(response);
        if(response){
            db.none('Insert into Cities(timeAdded, name) values($1, $2)',  [req.query.timeAdded, req.query.name]).then(result => {
                res.status(200).send(response);
            }).catch((error) => {
                res.status(400).send("Error occurred");
            });
        }
    });
});

app.delete('/favourites', function (req, res) {
    db.none('Delete from cities where timeAdded = $1', req.query.timeAdded).then(
        ()=>res.status(200).send()
    ).catch( (error) =>{
        res.status(400).send("There is no such city");
    })
});

app.listen(3003, function () {
    console.log('Example app listening on port 3003!');
});

const ApiKey = '982553b8d730dcb96e93d24aa490d4fe';

async function fetchCity(cityName, handler){
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + ApiKey + '&units=metric';
    request.get(url, function (error, response, body) {
        console.log('statusCode:', response && response.statusCode);
        handler(body);
    });
}

async function fetchCoords(longitude, latitude, handler){
    console.log(longitude, latitude);
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude +  '&lon=' + longitude + '&appid=' + ApiKey;
    request.get(url, function (error, response, body) {
        console.log('statusCode:', response && response.statusCode);
        handler(body);
});
}
