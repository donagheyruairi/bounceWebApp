import './App.css';
import { useState } from "react";

/**
 * Component used to graphically represent a single days weather
 *
 * @param {JSON} data - Prop containing day(ID), rain, wind, and temp fields
 */
function WeatherDay(data) {
  return (
    data.rain === true ?(
    <div className='weatherModule'>
      <h4>Day {data.day}</h4>
      <h4>Forecasted: Rain</h4>
      <h4>Average: temp of { data.temp }° wind speed of { data.wind }m/s</h4>
    </div>
  ):(
    <div className='weatherModuleDry'>
      <h4>Day {data.day}</h4>
      <h4>Forecasted: Dry</h4>
      <h4>Average: temp of { data.temp }° wind speed of { data.wind }m/s</h4>
    </div>
  ));
}

// Main App functionality
function App() {
  const [country, setCountry] = useState("");
  // Stores fetched country data
  const [data, setData] = useState(null);
  // Stores fetched weather data
  const [weather, setWeather] = useState(null);

  // Updates country input variable
  const changeHandler = (event) => {
    setCountry(event.target.value);
  }

  // On enter key, fetch data for current input country 
  const keyDownHandler = async (event) => {
    if(event.key === "Enter") {
      try{
        const response = await fetch("/api/"+country);
        var fetchedData = await response.json();
        setData(fetchedData.countryData);
        setWeather(fetchedData.weatherData);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="App">

      {/* This is our central content area*/}
      <div className="central">
        
        <h1>Welcome to the Internship Application Country App</h1>
        <input type="text" placeholder="Enter country here" value={country} onChange={changeHandler} onKeyDown={keyDownHandler}></input>
        
        {/* This displays if no fetched data*/}
        { data == null &&
          <h3 id='blankDisplay'>This area seems pretty empty. Search for a country so we can show some data!</h3>
        }

        {/* This displays if there is fetched data*/}
        { data != null &&
          <div className="dataSection">

            <div className='textSection' >

              <div className="countryDetails">
                <div className="flagContainer">
                  <img className="flagImage" src={data.flags.png} alt={data.flags.alt}></img>
                </div>
                <div className="placeNames">
                  <h3>{data.name.common}</h3>
                  <h3><i>{data.name.official}</i></h3>
                </div>
              </div>

              <div className='factSection'>

                {/* Facts are printed conditionally, if country has an unusual number of capitals*/}
                { data.capital==null &&
                  <h4> Did you know that {data.name.common} does not have a capital?</h4>
                }
                { data.capital!=null && data.capital.length === 2 &&
                  <h4> Did you know that {data.name.common} has 2 capital cities?
                  These are: {data.capital[0]} and {data.capital[1]}!</h4>
                }
                { data.capital!=null && data.capital.length === 3 &&
                  <h4> Did you know that {data.name.common} has 3 capital cities?
                  These are: {data.capital[0]}, {data.capital[1]} and {data.capital[2]}!</h4>
                }
                
                <h4>{data.name.common} is {data.independent ? "an independent " : "a non-independent "} 
                    nation with a population of {data.population}.</h4>
                <h4>{data.name.common} is in the {data.subregion} subregion of {data.region}.</h4>
                <h4>It has a total area of {data.area}km²,
                  and is{data.unMember ? "" : " not"} a current member of the UN.</h4>
                <h3>Planning to go to {data.name.common}?</h3>
                <h4>Remember that {data.demonyms.eng.m} people drive on the {data.car.side}.</h4>
                <h4>They use {data.currencies[Object.keys(data.currencies)[0]].name}  here, so 
                  make sure to exchange some for your trip.</h4>
              </div>
            </div>
              
            <div className='weatherSection'>
              { data.capital!=null &&
                  <h4> Here's the weather for the next 5 days in the capital city: {data.capital[0]}!</h4>
              }
              { data.capital==null &&
                  <h4> Here's the weather for the next 5 days in {data.name.common}!</h4>
              }
              <div className='weatherModules'>
                <WeatherDay day="1" rain={weather.days[0].rain} temp={weather.days[0].temp} wind={weather.days[0].wind} />
                <WeatherDay day="2" rain={weather.days[1].rain} temp={weather.days[1].temp} wind={weather.days[1].wind} />
                <WeatherDay day="3" rain={weather.days[2].rain} temp={weather.days[2].temp} wind={weather.days[2].wind} />
                <WeatherDay day="4" rain={weather.days[3].rain} temp={weather.days[3].temp} wind={weather.days[3].wind} />
                <WeatherDay day="5" rain={weather.days[4].rain} temp={weather.days[4].temp} wind={weather.days[4].wind} />
              </div>
            </div>

          </div>
        }
      </div>
    </div>
  );
}

export default App;
