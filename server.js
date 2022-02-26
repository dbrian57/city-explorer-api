'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const weather = require('./modules/weather.js');
const movies = require('./modules/movies.js');
const PORT = process.env.PORT || 3001;

require('dotenv').config();

app.use(cors());
app.get('/weather', weatherHandler);
app.get('/movies', movieHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(500).send('No weather data available')
  });
}

function movieHandler(request, response) {
  const searchQuery = request.query.searchQuery;
  movies(searchQuery)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(500).send('No movies data available')
  });
}  


app.listen(PORT, () => console.log(`Server up on ${PORT}`));