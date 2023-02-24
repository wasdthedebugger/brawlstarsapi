// use axios and get data from player tag using brawl stars api

const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const port = 3000;

const apiKey = process.env.API_KEY;

app.use(cors());

app.get('/:playerTag', (req, res) => {

    playerTag = req.params.playerTag;

    axios({
        method: 'get',
        url: `https://api.brawlstars.com/v1/players/%23YJRUUCQPP`,
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })
        .then(response => {
          // Handle successful response
          res.send( (response.data) );
        })
        .catch(error => {
          // Handle error
          res.send( (error) );
        });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})