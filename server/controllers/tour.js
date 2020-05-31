const mongoose = require("mongoose");
const Tours = require('../models/tour');

class Tour {
    constructor(name, place, description, imageUrl) {
        this.name = name;
        this.place = place;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    static getAll() {
        return Tours.find({});
    }

    static getSome(number) {
        return Tours.find({}).limit(number);
    }
}

module.exports = Tour;