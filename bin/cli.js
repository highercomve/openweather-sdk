#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const program = require('commander')
const version = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'))).version
const { parseArgsToType, getWeatherBy } = require('../src/index')
program
  .version(version, '-v, --version')
  .option('--city [string]', 'city to look', )
  .option('--country [string]', 'country to look')
  .option('--id [number]', 'id to look', parseInt)
  .option('--lat [number]', 'latitud to look', parseFloat)
  .option('--lon [number]', 'longitud to look', parseFloat)
  .option('--zip [number]', 'zip to look')
  .option('--appid [string]', 'api key')
  .option('--units [string]', 'type of units')
  .action(options => {
    console.log('Getting data from open weather')
    getWeatherBy(parseArgsToType(options), options)
      .then(console.info)
      .catch(console.error)
  })

program.parse(process.argv)