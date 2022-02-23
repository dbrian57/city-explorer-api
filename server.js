'use strict'

console.log('Hello world')

const express = require('express');

const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());

let data = require('./data/weather.json');

app.get('/', (request, response) => {
    response.send("Hello, from server!")
    }
    );

app.get('/weather', (request, response) => {
    console.log(request.query);
    let lat = request.query.lat;
    let lon = request.query.lon;
    let searchQuery = request.query.searchQuery;
    let weatherObject = data.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
    let dataToSend = weatherObject.data.map(day => new Forcast(day.datetime, day.weather.description))
    response.send(dataToSend);
})

class Forcast { 
    constructor(date, description){
        this.date = date;
        this.description = description;
    }
}

app.listen(PORT, (() => console.log(`Listening on port ${PORT}`)));

/*
app.get ('/sayHello', (request, response) => {
  console.log(request.query);
  let name = request.query.name;
  response.send(`Hello ${name}`)
})

app.get('/pet', (request, response) => {
  let species = request.query.species;
  console.log(species);

  
  let dataToSend = data.find(element => element === species)
  response.send(dataToSend);
})

class Pet {
  constructor(petObject){
    this.name = petObject.name;
    this.breed = petObject.breed
  }
}

// npx kill-port 3001
*/