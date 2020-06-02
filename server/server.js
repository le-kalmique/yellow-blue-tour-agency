const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const passport = require("passport");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");


const User = require("./controllers/user");

const Tour = require('./controllers/tour');

const API_PORT = 4000;

const app = express();
app.use(cors());
app.use(passport.initialize());
require("../config/passport")(passport);
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

router.post("/users/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.Register(req.body.email, req.body.login, req.body.password)
    .then(user => {
      if (user === null) res.status(400).send({ email: "Email already exists" });
      else res.status(200).send({user});
    })
    .catch(err => console.log(err));
});

router.post("/users/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;// Find user by email
  User.Login(email, password)
    .then(user => {
      if (!user.success) {
        if (user.exists !== undefined) {
          res.status(404).send("Email not found");
        }
        else if (!user.password) {
          res.status(400).send("Wrong password");
        }
      }
      else {
        res.status(200).send({user: user});
      }
    })
});

router.get('/users/:id/order/:tourId', (req, res) => {
  User.addTour(req.params.id, req.params.tourId)
    .then(success => res.status(200).send(success))
    .catch(err => res.status(500).send("Error 500"));
})

router.get('/users/:id', (req, res) => {
  User.getById(req.params.id)
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => res.status(500).send("Error 500"))
})

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

router.get('/tours/:id', (req, res) => {
  const id = req.params.id;
  Tour.getById(id)
    .then(tour => {
      if (tour.name === undefined) res.status(404).send({});
      else res.status(200).send(tour);
    })
    .catch(err => res.status(500).send(err));
})

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