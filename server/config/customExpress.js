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
const pgProgram = require('../models/pgfunctions')

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

    schedule.scheduleJob('0 0 * * *', async() => {
        const stageCount = await fetch('/stageCount')
        const stagesJson = await stageCount.json()

        const countAll =  await fetch('/countAll')
        const allJson = await countAll.json()

        const stage1Count = stagesJson[0].count
        const stage2Count = stagesJson[1].count
        const stage3Count = stagesJson[2].count
        const allCount = allJson.rows[0].count

        pgProgram.saveTotalLogs(allCount, stage1Count, stage2Count, stage3Count)
    })

    return app
}