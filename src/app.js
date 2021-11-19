const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const weatherInfo = require('./util/weatherInfo')

const app = express()

//Define paths for express config
const viewDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(viewDir))



//Rounting setup 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        headingOne: 'Weather App',
        creater: 'Sandeepan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        headingOne: 'Sandeepan',
        creater: 'Sandeepan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        headingOne: 'Help page',
        helpText: 'The help text',
        name: 'Sandeepna',
        creater: 'Sandeepan'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Must provide address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude} = {}) => {
        if(error) {
            return res.send({error})
        }
        weatherInfo(latitude, longitude, (error, {temperature, weatherDescriptions, windSpeed} = {}) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location: req.query.address,
                temperature,
                weatherDescriptions,
                windSpeed
            })
        })
    })


})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404 not found',
        headingOne: '404 Error',
        creater: 'Sandeepan'
    })
})


app.listen(3000, () => {
    console.log('Server lisinig on port 3000!')
})