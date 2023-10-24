const express = require("express");
const app = express();
const axios = require("axios")
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended:true }))
const port = 8082;
  
app.get("/:country?",async function(req,res){
    console.log(req.params.country)
    try {
        var country = await axios.get("https://restcountries.com/v3.1/name/"+req.params.country);
        res.send(country.data[0]);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error: Could not retrieve data');
      }
})

app.listen(port, () =>{
    console.log('Listening on port '+port)
})
