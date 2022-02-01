const request = require("request"); // This request module has  been deprecated by the author. But Postman-request fork it and we can use postman-request in near future.
const URL = "http://api.weatherstack.com/";
const coordinateURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const API_KEY = "a94804274341fb3f0c7fedad3cc404f7";
const mapBoxTokenKey =
  "pk.eyJ1IjoiYmFsbWlraXByYXNzYWQ2OSIsImEiOiJja3lwb2V5bTUwYzQ2MzFvN3NpdWRnczQ0In0.IA2631XcfuSxk5MQQRawCQ";

// Getting the weather requested by the user
const getWeather = (address, callback) => {
  request(
    {
      url: URL + "current?access_key=" + API_KEY + "&query=" + address,
      json: true, // This is to convert the response to json format.
    },
    function (error, response, body) {
        if (error) {
            callback("Unable to connect to the server");
        } else {
        if (body.success != false) {
          const data = body.current;
          callback(undefined, response, data);
        } else {
          callback("Unable to find the location");
        }
      }
    }
  );
};

// Geo coding task
// Address -> lat and long -> Weather
const getConditionalWeather = (placeName = "cuttack", callback) => {
  request.get(
    {
      url: `${coordinateURL}${placeName}.json?access_token=${mapBoxTokenKey}&limit=1`,
      json: true,
    },
    (err, res, body) => {
      if (err) {
        callback("Unable to connect to the server");
      } else if (body.features.length === 0) {
        callback("Unable to find the location");
      } else {
        const data = body.features[0];
        const lat = data.center[1];
        const long = data.center[0];
        callback(undefined, { lat, long });
      }
    }
  );
};

module.exports = {
  getWeather,
  getConditionalWeather,
};
