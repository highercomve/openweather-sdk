Open Weather API SDK
=====================

```bash
npm i openweather-sdk
```

### How to use it as a CLI

```bash
npm install --global openweather-sdk

## that will create a new command to get weather
weather --help
```

### How use it example

Get weather from several cities
```js
const appid = process.env.API_KEY // appid could be pass as thrid parameter to getAllWeatherBy

const { getAllWeatherBy } = require('./src/index')

const cities = [
  { name: 'Houston', zip: '77056' }
]

getAllWeatherBy('zip', cities)
  .then(data => console.log(JSON.stringify(data)))
  .catch(console.error)
```

response
```
[
  {
    "name": "Houston",
    "data": {
      "coord": {
        "lon": -95.47,
        "lat": 29.73
      },
      "weather": [
        {
          "id": 721,
          "main": "Haze",
          "description": "haze",
          "icon": "50d"
        },
        {
          "id": 701,
          "main": "Mist",
          "description": "mist",
          "icon": "50d"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 18.95,
        "pressure": 1020,
        "humidity": 87,
        "temp_min": 17,
        "temp_max": 21.1
      },
      "visibility": 12874,
      "wind": {
        "speed": 4.1,
        "deg": 110
      },
      "clouds": {
        "all": 75
      },
      "dt": 1549056000,
      "sys": {
        "type": 1,
        "id": 4780,
        "message": 0.0037,
        "country": "US",
        "sunrise": 1549026676,
        "sunset": 1549065612
      },
      "id": 420034412,
      "name": "Houston",
      "cod": 200
    }
  }
]
```

And can be use it with only one

```js
const { parseArgsToType, getWeatherBy } = require('../src/index')
const appid = process.env.API_KEY // appid could be pass as thrid parameter to getAllWeatherBy by default always read API_KEY

getWeatherBy('zip', { zip: 77056, country: 'us' })
  .then(data => console.log(JSON.stringify(data)))
  .catch(console.error)
```