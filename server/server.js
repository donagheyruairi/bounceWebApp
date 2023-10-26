const express = require("express");
const axios = require("axios")
const cors = require('cors');
const path = require("path")
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, '../client/build')))
const port = process.env.PORT || 8082;
  
function weatherSimplify(timeStamps){
  var rain = false;
  var tempSum = 0;
  var windSum = 0;
  for(let i=0; i<8; i++){
    if(timeStamps[i].weather[0].main=="Rain") rain=true;
    tempSum+=timeStamps[i].main.temp;
    windSum+=timeStamps[i].wind.speed;
  }
  return {
    rain: rain,
    temp: (tempSum/8).toFixed(2),
    wind: (windSum/8).toFixed(2)
  };
}

app.get("/api/:country?",async function(req,res){
    console.log(req.params.country)
    try {
        var country = await axios.get("https://restcountries.com/v3.1/name/"+req.params.country);
        var countryData = country.data[0];
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
        var weather = await axios.get("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=96132c218ae4f3cda2e2ce51b266ac52&units=metric");
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

app.get('*', (req, res) => {
  console.log(path.join(__dirname + '/../client/build/index.html'));
  res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

app.listen(port, () =>{
    console.log('Listening on port '+port)
})
