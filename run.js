#!/usr/bin/env node

const appid = process.env.API_KEY

const { getAllWeatherBy } = require('./src/index')

const cities = [
  { name: 'Houston', zip: '77056' }
]

getAllWeatherBy('zip', cities)
  .then(data => console.log(JSON.stringify(data)))
  .catch(console.error)