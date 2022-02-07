const express = require('express');
const consign = require('consign');
require('dotenv/config');
const path = require('path');
const dbClient = require('../database/connectionPG');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const isAuth = require('../models/is-auth');
const docx = require("docx");
const schedule = require('node-schedule');
const pgProgram = require('../models/pgfunctions');


module.exports = () => {
    const app = express()

    const oneDay = 1000 * 60 * 60 * 9;
    app.use(session({
    secret: process.env.SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
    }));

    app.use(express.json({limit: '15mb'}));    
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

    schedule.scheduleJob('0 3 * * *', async() => {
        const stage1Count = await pgProgram.countStage('Stage 1')
        const stage2Count = await pgProgram.countStage('Stage 2')
        const stage3Count = await pgProgram.countStage('Stage 3')
        
        const result = await pgProgram.countAll()

        console.log(stage1Count.rows[0].count, stage2Count.rows[0].count, stage3Count.rows[0].count, result.rows[0].count)

        pgProgram.saveTotalLogs(result.rows[0].count, stage1Count.rows[0].count, stage2Count.rows[0].count, stage3Count.rows[0].count)
        console.log('Total Logs Saved')
    })

    return app
}