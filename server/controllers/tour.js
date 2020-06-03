const Tours = require('../models/tour');

class Tour {
    constructor(name, place, description, imageUrl, date, placesAll) {
        this.name = name;
        this.place = place;
        this.description = description;
        this.imageUrl = imageUrl;
        this.date = date;
        this.placesAll = placesAll;
        this.placesLeft = placesAll;
    }

    static getById(id) {
        return Tours.findOne({_id: id});
    }

    static getAll() {
        return Tours.find({date: {$gte: new Date().toISOString()}});
    }

    static getSome(number) {
        return Tours.find({date: {$gte: new Date().toISOString()}}).limit(number);
    }

    static getPage(pageNum, perPage, searchQuery, city, minDate, maxDate) {
        return new Promise((resolve, reject) => {
            let filter = {
                name: {
                    $regex: searchQuery,
                    $options: "i"
                },
                city: {
                    $in: city
                },
                date: {
                    $gte: minDate,
                    $lte: maxDate
                },
                placesLeft: {
                    $gt: 0
                }
            }
            if (city.length === 0) filter.city = { $regex: ""};
            let query = Tours.find(filter);
            query.skip(perPage * pageNum).limit(perPage)
              .then(tours => {
                  Tours.countDocuments(filter)
                    .then(tourNum => {
                        let toursData = {
                            toursOnPage: tours,
                            toursLength: tourNum
                        };
                        resolve(toursData);
                    });
              })
              .catch(err => reject(err));
        });
    }

    static getCities(name) {
        return Tours.find({name: {$regex: name, $options: "i"}}).sort('name').distinct('city');
    }
}

module.exports = Tour;