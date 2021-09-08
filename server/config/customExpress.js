const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const path = require('path')

module.exports = () => {
    const app = express()

    app.use
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.set('../views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')
    
    consign()
    .include('controllers')
    .into(app)

    //static files
    app.use(express.static('public'))
    app.use('/css', express.static(__dirname + 'public'))
    app.use('/js', express.static(__dirname + 'public/js'))
    app.use('/img', express.static(__dirname + 'public/img'))
    

    return app
}