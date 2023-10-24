import './App.css';
import { useState } from "react";
const serverPort = 8082;

function App() {
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);

  const changeHandler = (event) => {
    setCountry(event.target.value);
  }

  const keyDownHandler = async (event) => {
    if(event.key == "Enter") {
      try{
        const response = await fetch('http://localhost:'+serverPort+"/"+country); 
        var fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="App">
      <div className="central">
        <h1>Welcome to the Internship Application Country App</h1>
        <input type="text" placeholder="Enter country here" value={country} onChange={changeHandler} onKeyDown={keyDownHandler}></input>
        { data != null &&
          <p>{data.name.common}</p>
        }
      </div>
    </div>
  );
}

export default App;
