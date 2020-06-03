const Tours = require('../models/tour');
const Users = require('../models/user');

const mongoose = require('mongoose');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

class User {
  constructor(login, password, email) {
    this.login = login;
    this.password = password;
    this.email = email;
  }

  static getById(id) {
    return Users.findOne({_id: id});
  }

  static getUserTours(userId) {
    return Users.findById(userId).populate({path: 'tours', model: Tours}).exec();
  }

  static addTour(userId, tourId) {
    return new Promise((resolve, reject) => {
      Users.findOneAndUpdate({_id: userId}, {$push: {tours: tourId}})
        .then(updated => {
          return Tours.findOneAndUpdate({_id: tourId}, {$inc: {'placesLeft': -1}})
        })
        .then(updated => resolve(true))
        .catch(err => reject(err));
    });
  }

  static Register(email, login, password) {
    return new Promise((resolve, reject) => {
      Users.findOne({ email: email }).then(user => {
        if (user) {
          resolve(null);
        } else {
          const newUser = new Users({
            login: login,
            email: email,
            password: password
          });
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => resolve(user));
            });
          });
        }
      })
        .catch(err => reject(err));
    })
  }

  static Login(email, password) {
    return new Promise((resolve, reject) => {
      Users.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
          resolve({success: false, exists: false});
        }
        // Check password
        else bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.login
            };
            // Sign token
            jwt.sign(
              payload,
              "secret",
              (err, token) => {
                resolve({
                  success: true,
                  token: token
                });
              }
            );
          } else {
            resolve({success: false, password: false})
          }
        })
          .catch(err => reject(err));
      });
    })
  }
}

module.exports = User;