const request = require('postman-request');

const geocode = (address, callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoid2FkYXdhZGEiLCJhIjoiY2w2Zm8xcTdwMHo5ZzNjbjI4Ym92aWwwaSJ9.qZPjdYepNHId9e30pbnI8g&limit=1"
  request({url, json: true}, (error, response) => {
    if (error) {
      callback("Unable to connect to mapbox service.")
      return
    }
    if (response.body.features.length === 0) {
      callback("Unable to find location. Try searching something else.")
      return
    }

    callback(undefined, {
      longitude: response.body.features[0].center[0],
      latitude: response.body.features[0].center[1],
      location: response.body.features[0].place_name,
    })

  })
}


module.exports = geocode