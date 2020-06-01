const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');


const Tour = require('./controllers/tour');

const API_PORT = 4000;

const app = express();
app.use(cors());
const router = express.Router();

const dbRoute =
    'mongodb://localhost/tourAgencyDb';

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('Connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api', router);

router.get('/tours/gallery', (req,res) => {
  let gallerySize = 6;
  if (req.query.len) gallerySize = parseInt(req.query.len);
  Tour.getSome(gallerySize)
    .then(tours => {
      res.status(200).send({
        tours: tours
      })
    })
    .catch(err => res.status(500).send("Error 500"));
})

router.get('/tours/carousel', (req, res) => {
    let carouselLen = 3;
    if (req.query.len) carouselLen = parseInt(req.query.len);
    Tour.getSome(carouselLen)
      .then(tours => {
          res.status(200).send({
            tours: tours
          })
      })
      .catch(err => res.status(500).send("Error 500"))
})

router.get('/tours/cities', (req, res) => {
  let name = "";
  if (req.query.name) name = req.query.name;
  Tour.getCities(name)
    .then(cities => res.status(200).send(cities))
    .catch(err => res.status(500).send(err));
});


router.get('/tours', (req,res)=> {
    let page = 0;
    if (req.query.page) page = parseInt(req.query.page) - 1;
    let toursPerPage = 5;
    if (req.query.limit) toursPerPage = parseInt(req.query.limit);
    let searchQuery = "";
    if (req.query.search) searchQuery = req.query.search;
    let city = [];
    if (req.query.city) city = req.query.city;
    let minDate = new Date();
    if (req.query.minDate && req.query.minDate.length !== 0) minDate = new Date(req.query.minDate);
    let maxDate = new Date();
    maxDate.setFullYear(minDate.getFullYear() + 1);
    if (req.query.maxDate && req.query.maxDate !== "") maxDate = new Date(req.query.maxDate);
    if (page < 0) res.status(400).send('Bad request');
    else Tour.getPage(page, toursPerPage, searchQuery, city, minDate, maxDate)
        .then(tours => {
            const pagesNum = Math.ceil(tours.toursLength / toursPerPage);
            res.status(200).send({
                tours: tours.toursOnPage,
                page: page+1,
                pagesNum: pagesNum
            })
        })
        .catch(err => {
            res.status(500).send(err);
        })
})




// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));