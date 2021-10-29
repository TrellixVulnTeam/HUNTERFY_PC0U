const express = require('express');
const consign = require('consign');
//const bodyParser = require('body-parser');
const path = require('path');
const dbClient = require('../database/connectionPG');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const isAuth = require('../models/is-auth');
const docx = require("docx");

module.exports = () => {
    const app = express()

    const oneDay = 1000 * 60 * 60 * 9;
    app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
    }));

    //app.use(bodyParser.urlencoded({extended: true}))
    //app.use(bodyParser.json())
    app.use(express.json({limit: '15mb'}));
    //app.use(express.urlencoded({limit: '50mb'}));
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

    app.use(cookieParser());

    return app
}