const express = require("express");
const axios = require("axios")
const cors = require('cors');
const path = require("path")
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, '../client/build')))
const port = process.env.PORT || 8082;
  
/**
 * Simplifies eight complex timestamps of weather data into 3 general datapoints
 *
 * @param {Array} timeStamps - Array of eight timestamps of weather data over 24 hours.
 * @returns {JSON} Our three important simplified datapoints for over the entire 24 hours.
 */
function weatherSimplify(timeStamps){
  try {
    var rain = false;
    var tempSum = 0;
    var windSum = 0;
    for(let i=0; i<8; i++){
      
      // If we have rain at any time, consider the day as rainy.
      if(timeStamps[i].weather[0].main=="Rain") rain=true;
      
      // Total our wind/temp, so they can be averaged in the return.
      tempSum+=timeStamps[i].main.temp;
      windSum+=timeStamps[i].wind.speed;
    }
    return {
      rain: rain,
      temp: (tempSum/8).toFixed(2),
      wind: (windSum/8).toFixed(2)
    };
  }
  catch(error) {
    throw new Error("Invalid JSON array input");
  }
}

/**
 * Returns a JSON object with data about our given country, and weather data for its capital
 *
 * @param {string} req.params.country - Country we want data for.
 * @returns {JSON} JSON object, seperated into countryData and weatherData.
 */
app.get("/api/:country?",async function(req,res){
    console.log(req.params.country)
    try {
        // Query the restcountries API
        var country = await axios.get("https://restcountries.com/v3.1/name/"+req.params.country);
        var countryData = country.data[0];
        
        // If country has a capital, get its latitude/longitude. Else, get a general latlon.
        var lat;
        var lon;
        if(countryData.capital!=null){
          lat = countryData.capitalInfo.latlng[0];
          lon = countryData.capitalInfo.latlng[1];
        }
        else{
          lat = countryData.latlng[0];
          lon = countryData.latlng[1];
        }
        
        // Query the openweather API for the forecast for our latlon.
        var weather = await axios.get("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=96132c218ae4f3cda2e2ce51b266ac52&units=metric");
        
        // We get 40 timestamps, 8 per day. We seperate and simplify each day.
        const weatherData = {
          days:[
            weatherSimplify(weather.data.list.slice(0, 8)),
            weatherSimplify(weather.data.list.slice(8, 16)),
            weatherSimplify(weather.data.list.slice(16, 24)),
            weatherSimplify(weather.data.list.slice(24, 32)),
            weatherSimplify(weather.data.list.slice(32, 40))
          ]
        };
        res.send({
          countryData: countryData,
          weatherData: weatherData
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error: Could not retrieve data');
      }
})

// General request handler, for returning our webpage
app.get('*', (req, res) => {
  console.log(path.join(__dirname + '/../client/build/index.html'));
  res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

// Logs a message telling us the server is running on a specified port
app.listen(port, () =>{
    console.log('Listening on port '+port)
})

module.exports = { weatherSimplify };