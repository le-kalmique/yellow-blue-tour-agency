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

router.get('/tours', (req,res)=> {
    let page = 0;
    if (req.query.page) page = parseInt(req.query.page) - 1;
    let toursPerPage = 5;
    if (req.query.limit) toursPerPage = req.query.limit;
    let searchQuery = "";
    //if (req.query.search) searchQuery = req.query.search;
    if (page < 0) res.status(400).send('Bad request');
    else Tour.getAll()
        .then(tours => {
            const pagesNum = Math.ceil(tours.toursNum / toursPerPage);
            res.status(200).send({
                tours: tours,
                page: page+1,
                pagesNum: pagesNum
            })
        })
        .catch(err => {
            res.status(500).send({});
        })
})

router.post('/', (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    const newUser = {
        profile: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            login: req.body.email
        },
        credentials: {
            password: {
                value: req.body.password
            }
        }
    };
    oktaClient.createUser(newUser)
        .then(user => {
            res.status(201);
            res.send(user);
        })
        .catch(err => {
            res.status(400);
            res.send(err);
        })
});


// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));