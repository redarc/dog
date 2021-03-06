import express = require('express');
import path = require('path');
import axios from 'axios';
const app: express.Application = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.resolve('../client/build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(path.resolve('../client/build'), 'index.html'));
});

//get breed list
app.get('/dog/breeds', (req, res) => {
  axios.get('https://dog.ceo/api/breeds/list/all')
    .then(r_res => {
      let result = [];
      if (r_res && r_res.data && r_res.data.message) {
        for (const breed of Object.keys(r_res.data.message)) {
          result.push({
            'breed': breed,
            'subbreed': r_res.data.message[breed]
          })
        }
      }
      res.send(result);
    })
    .catch(r_err => {
      console.log(r_err);
      if(r_err.response && r_err.response.data) {
        res.status(500).send({
          error: r_err.response.data
        });
      } else {
        res.status(500).send({
          error: r_err.Error
        });
      }

    });
});

//get dog image by breed and subbreed, breed is required, subbreed is optional
app.get('/dog/image', (req, res) => {
  const breed = req.query.breed;
  if (!breed) {
    res.status(400).send({
      error: 'Parameter error, must specify one breed'
    });
  }
  const subbreed = req.query.subbreed;
  const subfix = subbreed ? '/' + subbreed : '';
  let url = 'https://dog.ceo/api/breed/' + breed + subfix + '/images';
  axios.get(url)
    .then(r_res => {
      let result = [];
      if (r_res && r_res.data && r_res.data.message) {
        result = r_res.data.message;
      }
      res.send({
        images: result
      });
    })
    .catch(r_err => {
      console.log(r_err);
      if(r_err.response && r_err.response.data) {
        res.status(500).send({
          error: r_err.response.data
        });
      } else {
        res.status(500).send({
          error: r_err.Error
        });
      }
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports.app = app;
