const express = require('express');
const app = express();
const port = 3000;

//libraries
const axios = require('axios');
const path = require('path');
const cors = require('cors');

//service locations
const imageGalleryURL = 'http://localhost:4012'
const metadataURL = 'http://localhost:4032'
const moreLikeURL = 'http://localhost:4022'
const reviewURL = 'http://localhost:4052'

//middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


//Image gallery requests
app.get('/image-gallery-service', (req, res) => {
  axios.get(imageGalleryURL + '/index_bundle.js').then((response) => {
    res.status(200).send(response.data);
  }).catch((err) => {
    res.status(404).send(err);
  });
});
app.get('/images/:page', (req, res) => {
  axios.get(imageGalleryURL + '/images/' + req.params.page).then((response) => {
    res.status(200).send(response.data);
  }).catch((err) => {
    res.status(404).send(err);
  });
});

//Metadata requests
app.get('/metadata-service', (req, res) => {
  axios.get(metadataURL + '/index.js').then((response) => {
    res.status(200).send(response.data);
  }).catch((err) => {
    res.status(404).send(err);
  });
});
app.get('/api/product/:id', (req, res) => {
  axios.get(metadataURL + '/api/product/' + req.params.id).then((response) => {
    res.status(200).send(response.data);
  }).catch((err) => {
    res.status(404).send(err);
  });
});

//More like this requests
app.get('/more-like-service', (req, res) => {
  axios.get(moreLikeURL + '/bundle.js').then((response) => {
    res.status(200).send(response.data);
  }).catch((err) => {
    res.status(404).send(err);
  });
});
app.get('/morelikethis/:id', (req, res) => {
  axios.get(moreLikeURL + '/morelikethis/' + req.params.id).then((response) => {
    res.status(200).send(response.data);
  }).catch((err) => {
    res.status(404).send(err);
  });
});

//Review requests
app.get('/review-service', (req, res) => {
  axios.get(reviewURL + '/bundle.js').then((response) => {
    res.status(200).send(response.data)
  }).catch((err) => {
    res.status(404).send(err);
  })
});
app.get('/reviews/:id', (req, res) => {
  axios.get(reviewURL + '/reviews/' + req.params.id).then((response) => {
    res.status(200).send(response.data);
  }).catch((err) => {
    res.status(404).send(err);
  });

});

//serve static files
app.get('*/index.js', async (req, res) => {
  res.sendFile(path.join(__dirname,'..','public','index.js'));
});

app.get('/:id', async (req, res) => {
  res.sendFile(path.join(__dirname,'..','public','index.html'));
});

module.exports = {app, port};