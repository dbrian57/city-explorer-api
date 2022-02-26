'use strict'

const express = require('express');

const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());

const axios = require('axios');

const getMovies = require('./movies.js');
const getWeather = require('./weather.js');

app.get('/', (request, response) => {
    response.send("Hello, from server!")}
    );

// Test Weather URL http://localhost:3001/weather?searchQuery=Seattle&lon=-122.332069&lat=47.606209

// Test Movies URL http://localhost:3001/movies?searchQuery=Seattle

app.get('/movies', getMovies);

app.get('/weather', getWeather);



app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

app.listen(PORT, (() => console.log(`Listening on port ${PORT}`)));
