var fetch = require('node-fetch');
var express = require('express');
var app = express();

// that's ok for prototype
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const cities = require('./cities.json');

app.get('/cities/', function (req, res) {
  let {name, latitude, longitude} = req.query;
  // imitate long request
  setTimeout(() => {
    res.setHeader('Content-Type', 'application/json');
    let items;
    if (name) {
      items = cities.filter(city => city.name.toLowerCase().indexOf(name) > -1)
    } else if (latitude && longitude) {
      items = cities.sort((city, nextCity) => {
        const firstDelta = Math.abs(city.lat - latitude) + Math.abs(city.lng - longitude);
        const nextDelta = Math.abs(nextCity.lat - latitude) + Math.abs(nextCity.lng - longitude);
        return firstDelta - nextDelta;
      });
      items = [items[0]];
    } else {
      items = []
    }
    res.json({ items });
  }, 500);
});

const OPENWEATHER_FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast';
const OPENWEATHER_API_KEY = '2d31d4b9e2dfda2b7b6bcff676b5b3c8';

app.get('/forecast/', function (req, res) {
  let {lat, lng} = req.query;
  if (!lat || !lng) {
    res.json({});
    return;
  }
  const url = `${OPENWEATHER_FORECAST_URL}?lat=${lat}&lon=${lng}&APPID=${OPENWEATHER_API_KEY}`;
  fetch(url)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(() => res.status(500).send('Error in weather api'));
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});