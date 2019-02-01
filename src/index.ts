import axios from 'axios'

interface Cords {
  "lon": number;
  "lat": number;
}

interface System {
  "type": number;
  "id": number;
  "message": number;
  "country": string;
  "sunrise": number;
  "sunset": number;
}

interface WeatherDesc {
  "id": number;
  "main": string;
  "description": string;
  "icon": string;
}

interface WeatherInfo {
  "temp": number;
  "humidity": number;
  "pressure": number;
  "temp_min": number;
  "temp_max": number;
}

interface WindInfo {
  "speed": number;
  "deg": number;
}

interface Clouds {
  "all": number;
}

interface OpenWeatherInfo {
  "coord": Cords;
  "sys": System;
  "weather": [WeatherDesc];
  "base": string;
  "main": WeatherInfo;
  "wind": WindInfo;
  "clouds": Clouds;
  "dt": number;
  "id": number;
  "name": string;
  "cod": number;
}

interface OWQParams {
  q?: string;
  id?: number;
  lat?: number;
  lon?: number;
  zip?: string;
  appid?: string;
  units?: string;
}

interface IMapToQuery {
  [index:string]: MapperFunction;
}

interface IParamsToWeather {
  city?: string;
  country?: string;
  id?: number;
  lat?: number;
  lon?: number;
  zip?: string;
  appid?: string;
}

interface Location extends IParamsToWeather {
  name: string;
}

interface LocationWeather {
  name: string;
  data: OpenWeatherInfo;
}

type MapperFunction = (q: IParamsToWeather | OWQParams) => OWQParams

const mapTypeOfQuery: IMapToQuery = {
  city: (q: IParamsToWeather): OWQParams => ({ q: q.country ? `${q.city},${q.country}` : `${q.city}` }),
  id: (q: IParamsToWeather): OWQParams => ({ id: q.id }),
  geographic: (q: IParamsToWeather): OWQParams => ({ lat: q.lat, lon: q.lon }),
  zip: (q: IParamsToWeather): OWQParams => ({ zip: q.country ? `${q.zip},${q.country}` : `${q.zip}` }),
  default: (q: OWQParams) => q
}

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export async function getWeather (params: OWQParams = {}) : Promise<OpenWeatherInfo> {
  if (Object.keys(params).length <= 0) {
    throw new Error('Params can not be empty')
  }
  return axios({
    method: 'GET',
    url: BASE_URL,
    params: params
  }).then(response => response.data)
}

export async function getWeatherBy (
  type: string,
  payload: IParamsToWeather,
  apiKey?: string
) : Promise<OpenWeatherInfo> {
  const params = mapTypeOfQuery[type] || mapTypeOfQuery['default']
  const payloadWithAppId = {
    appid: apiKey || payload.appid,
    units: 'metric',
    ...params(payload)
  }
  return getWeather(payloadWithAppId)
}

export async function getAllWeatherBy (
  type: string,
  payload: [Location],
  apiKey: string | undefined = process.env.API_KEY
): Promise<LocationWeather[]> {
  return Promise.all(payload.map(async (p) => {
    const data = await getWeatherBy(type, p, apiKey)
    return {
      name: p.name,
      data
    }
  }))
}

export function parseArgsToType (args: IParamsToWeather): string {
  switch (true) {
    case Boolean(args.zip):
      return 'zip'
    case Boolean(args.lat && args.lon):
      return 'geographic'
    case Boolean(args.id):
      return 'id'
    case Boolean(args.city):
      return 'city'
    default:
      throw new Error('You need to pass at least one of these paramaters zip|geographic|id|city')
  }
}
