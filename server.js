'use strict'

const express = require('express');

const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());

const axios = require('axios');

app.get('/', (request, response) => {
    response.send("Hello, from server!")}
    );

// Test URL http://localhost:3001/weather?searchQuery=Seattle&lon=-122.332069&lat=47.606209

app.get('/weather', async (request, response) => {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let searchQuery = request.query.searchQuery;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;
    
    let weatherArray = [];
    let getWeather = await axios.get(url);
    weatherArray.push(getWeather);

    let weatherObject = weatherArray.find(city => city.data.city_name.toLowerCase() === searchQuery.toLowerCase());
    
    let dataToSend = weatherObject.data.data.map(day => new Forcast(day.datetime, day.weather.description));

    response.send(dataToSend);

})

// Test URL http://localhost:3001/movies?searchQuery=Seattle

app.get('/movies', async (request, response) => {
  let searchQuery = request.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;

  let getMovieObject = await axios.get(url);

  let movieToSend = getMovieObject.data.results.map(movie => new Movies(movie.title, movie.release_date, movie.overview));
  response.send(movieToSend);
}
);

class Forcast { 
    constructor(date, description){
        this.date = date;
        this.description = description;
    }
}

class Movies {
  constructor(title, release_date, overview){
    this.title = title;
    this.release_date = release_date;
    this. overview = overview;
  }
}

/*
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
*/

app.listen(PORT, (() => console.log(`Listening on port ${PORT}`)));
