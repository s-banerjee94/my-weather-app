const request = require('postman-request')

const weatherInfo =(latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ada51ec6c939731d77c07529f157e235&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({url, json: true}, (error, {body} = {}) => {
        // console.log(body)
        if(error) {
            callback('Unable to connect ot weather server!', undefined)
        } else if(body.error) {
            callback('Wrong latitude or longitude!', undefined)
        } else {
            callback(undefined,{
                temperature: body.current.temperature,
                weatherDescriptions: body.current.weather_descriptions[0],
                windSpeed: body.current.wind_speed
            })
        }
    })
}

module.exports = weatherInfo