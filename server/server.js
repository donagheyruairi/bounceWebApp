const express = require("express");
const axios = require("axios")
const cors = require('cors');
const path = require("path")
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, '../client/build')))
const port = process.env.PORT || 8082;
  
app.get("/api/:country?",async function(req,res){
    console.log(req.params.country)
    try {
        var country = await axios.get("https://restcountries.com/v3.1/name/"+req.params.country);
        res.send(country.data[0]);
      } catch (error) {
        console.error(error);
        console.log("Error check")
        //res.status(500).send('Error: Could not retrieve data');
      }
})

app.get('*', (req, res) => {
  console.log(path.join(__dirname + '/../client/build/index.html'));
  res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

app.listen(port, () =>{
    console.log('Listening on port '+port)
})
