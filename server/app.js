const express = require('express');
const app = express();
const port = 3000;

//libraries
const axios = require('axios');
const path = require('path');
const cors = require('cors');

//service locations
const imageGalleryURL = process.env.IMAGEGAL_SERVICE || 'http://localhost:4012';
const metadataURL = process.env.METADATA_SERVICE || 'http://localhost:4032';
const moreLikeURL = process.env.MORELIKE_SERVICE || 'http://localhost:4022';
const reviewURL = process.env.REVIEWS__SERVICE || 'http://localhost:4052';

//middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


//BUNDLE CACHE
var bundles = {};
axios.get(imageGalleryURL + '/index_bundle.js').then((response) => {
  bundles.imageGalleryBundle = response.data;
}).catch((e) => {});
axios.get(metadataURL + '/index.js').then((response) => {
  bundles.metadataBundle = response.data;
}).catch((e) => {});
axios.get(moreLikeURL + '/bundle.js').then((response) => {
  bundles.moreLikeBundle = response.data;
}).catch((e) => {});
axios.get(reviewURL + '/bundle.js').then((response) => {
  bundles.reviewBundle = response.data;
}).catch((e) => {});


//Image gallery requests
app.get('/image-gallery-service', (req, res) => {

  if (bundles.imageGalleryBundle) {
    res.status(200).send(bundles.imageGalleryBundle);
  } else {
    axios.get(imageGalleryURL + '/index_bundle.js').then((response) => {
      bundles.imageGalleryBundle = response.data;
      res.status(200).send(response.data);
    }).catch((err) => {
      res.status(404).send(err);
    });
  }

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

  if(bundles.metadataBundle) {
    res.status(200).send(bundles.metadataBundle);
  } else {
    axios.get(metadataURL + '/index.js').then((response) => {
      bundles.metadataBundle = response.data;
      res.status(200).send(response.data);
    }).catch((err) => {
      res.status(404).send(err);
    });
  }
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

  if(bundles.moreLikeBundle) {
    res.status(200).send(bundles.moreLikeBundle);
  } else {
    axios.get(moreLikeURL + '/bundle.js').then((response) => {
      bundles.moreLikeBundle = response.data;
      res.status(200).send(response.data);
    }).catch((err) => {
      res.status(404).send(err);
    });
  }
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

  if(bundles.reviewBundle) {
    res.status(200).send(bundles.reviewBundle);
  } else {
    axios.get(reviewURL + '/bundle.js').then((response) => {
      bundles.reviewBundle = response.data;
      res.status(200).send(response.data)
    }).catch((err) => {
      res.status(404).send(err);
    })
  }
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