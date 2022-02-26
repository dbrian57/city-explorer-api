'use strict';

const { append } = require('express/lib/response');
let cache = require('./cache.js');
const axios = require('axios');

function getMovies(searchQuery) {
  const key = 'movies-' + searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 3600000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
    .then(response => parseMovies(response.data));
  }
  
  return cache[key].data;
}

function parseMovies(movieData) {
  try {
    const movieSummaries = movieData.results.map(movie => {
      return new Movie(movie.title, movie.release_date, movie.overview);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movie {
  constructor(title, release_date, overview) {
    this.title = title;
    this.release_date = release_date;
    this.overview = overview;
  }
};

module.exports = getMovies;