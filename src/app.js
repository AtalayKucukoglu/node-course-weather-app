const path = require('path');
const express = require('express');
const hbs = require('hbs');

// mapbox service
const geocode = require('./utils/geocode');
// weather service
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

// #region configs
// set view engine
app.set('view engine', 'hbs')
// set public folder
const publicFolderPath = path.join(__dirname, '../public')
app.use(express.static(publicFolderPath))
// set views folder
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)
// set partials folder
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)
// #endregion


// #region routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Weather app index page'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Weather app about page'
  })
})


app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Weather app help page'
  })
})

app.get('/help/*', (req, res) => {
  res.send("Help article not found")
})

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'An address must be provided.'
    })
  }

  geocode(address, (error, data) => {
    if (error) {
      console.log(error)
      return res.send({ error })
    }
  
    forecast(data, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      return res.send({
        location: data.location,
        forecast: forecastData,
      })
    })
  })
  
  

})


app.get('/*', (req, res) => {
  res.render('error', {
    code: 404,
    message: 'Page not found.'
  })
})
// #endregion


app.listen(port, () => {
  console.log("Server is running on port " + port)
})
