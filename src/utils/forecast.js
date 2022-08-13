const request = require('postman-request');

const forecast = ({ latitude, longitude }, callback) => {
  // coordinate error
  if (!latitude || !longitude) {
    callback("Please provide latitude and longitude parameters.")
    return
  }
  if (longitude > 180 || longitude < -180) {
    callback("Please provide a valid longitude.")
    return
  }
  if (latitude > 90 || latitude < -90) {
    callback("Please provide a valid latitude.")
    return
  }

  const url = "http://api.weatherstack.com/current?access_key=3ab0b3c9778bdd2476b329587f96695d&query=" + latitude + ',' + longitude

  request({ url, json: true }, (error, response) => {
    // low level error
    if (error) {
      callback("Unable to connect to mapbox service.")
      return
    }
    const data = response.body

    // api error
    if (data.error) {
      callback("An error occured.")
      return
    }

    const { temperature, precip, weather_descriptions } = data.current
    callback(undefined, "It is currently " + temperature + " degrees out. There is a " + precip + "% chance of rain. It is " + weather_descriptions[0] + '.')
  })
}

module.exports = forecast