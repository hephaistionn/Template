const conf = require('../conf');
const axios = require('axios');
const baseRoute = 'https://maps.googleapis.com/maps/api/place/';
const key = conf.GOOGLE_API_KEY

const googleapi = {
    details: function* details(placeId) {
        const response = yield axios.get(baseRoute + `details/json?key=${key}&placeid=${placeId}`);
        const city = response.data.result.formatted_address;
        const location = response.data.result.geometry.location;
        return {
            city: city,
            location: location
        };
    },
    autocomplete: function* autocomplete(input) {
        const response = yield axios.get(baseRoute + `autocomplete/json?key=${key}&input=${input}&types=(cities)`);
        const result = response.data.predictions.map(prediction => {
            return {
                city: prediction.description,
                placeid: prediction.place_id
            }
        });
        return result;
    }
}

module.exports = googleapi;