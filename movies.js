'use strict';

const axios = require('axios');

async function getMovies(request, response, next) {
try {
  let searchQuery = request.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;

  let getMovieObject = await axios.get(url);

  let movieToSend = getMovieObject.data.results.map(movie => new Movies(movie.title, movie.release_date, movie.overview));
  response.send(movieToSend);
  
  } catch (error) {
    throw new Error('Movies Currently Unavailable')
  }
  };

class Movies {
  constructor(title, release_date, overview){
    this.title = title;
    this.release_date = release_date;
    this. overview = overview;
  }
};

module.exports = getMovies;