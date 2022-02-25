'use strict'

const axios = require('axios');

async function getWeather(request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;
    
    let getWeather = await axios.get(url);
    
    let dataToSend = getWeather.data.data.map(day => new Forcast(day.datetime, day.weather.description));

    response.send(dataToSend);
  } catch (error) {
    throw new Error('Weather Currently Unavailable');
  }
}

class Forcast { 
  constructor(date, description){
      this.date = date;
      this.description = description;
  }
}

module.exports = getWeather;