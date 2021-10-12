const session = require('express-session')
const { searchTable, insertNewUser, getUsers, selectUser, editRank2, addOnDatabase, searchLogs, add2Log, editDB, searchByChecked, resumedSearch, dailySearch } = require('../models/pgfunctions')
const isAuth = require('../models/is-auth')
const isAuthManager = require('../models/is-auth-manager')
const isAuthPost = require('../models/is-auth-post')
const usStates = require('../database/geojson/us_states.json')
const usCounties = require('../database/geojson/us_counties.json')
const { json } = require('body-parser')
pgProgram = require('../models/pgfunctions')

module.exports = app => {
     //GETS----------------------->
    app.get('/', (req, res) => {
        res.render('index.ejs')
    })

    app.get('/app', isAuth, async(req, res) => {
        res.render('app.ejs', {user : req.session.user})
    })

    app.get('/manager', isAuthManager, (req, res) => {
        res.render('manager.ejs', {user : req.session.user})
    })
    
    app.get('/register', isAuthManager, (req, res) => {
        res.render('register.ejs', {user : req.session.user})
    })

    app.get('/searchbyuser', isAuthManager, (req, res) => {
        res.render('searchbyuser.ejs', {user : req.session.user})
    })

    app.get('/userlogs', isAuthManager, (req,res) => {
        res.render('userlogs.ejs', {user : req.session.user})
    })

    app.get('/allusers', isAuthManager, (req, res) => {
        res.render('getallusers.ejs', {user : req.session.user})
    })

    app.get('/getallusers', (req, res) => {
        pgProgram.allUsers(res)
        console.log(req.session.user, 'searched all users')
    })


    app.get('/searchbyrank', isAuthManager, (req, res) => {
        res.render('searchbyrank.ejs', {user : req.session.user})
    })

    app.get('/login', (req, res) => {
        res.render('manager-login-page.ejs')
    })

    app.get('/searchbyparcel',isAuthManager, (req, res) => {
        res.render('searchbyparcel.ejs', {user : req.session.user})
    })

    app.get('/searchbycounty', isAuthManager, (req, res) => {
        res.render('searchbycounty.ejs', {user : req.session.user})
    })

    app.get('/getproduction', async(req, res) => {
        try{const date = new Date()
            const day = ("0" + date.getDate()).slice(-2)
            const month = ("0" + (date.getMonth() + 1)).slice(-2)
            const yyyymmdd = `${date.getFullYear()}-${month}-${day}`
            console.log(yyyymmdd)
            const result = await pgProgram.dailySearch(req.session.user, yyyymmdd)
            const resultRowCount = `{"rowCount":"${result.rowCount}"}`
            res.send(resultRowCount)
        }
        catch(error){
            console.log(error)
        }
    })

    app.get('/logoff', async(req, res) => {
        try{
            console.log(req.session.user, 'deslogado')
            req.session.destroy();
            res.redirect('/login')
        }
        catch(err){
            console.log(err)
        }
    })

    app.get('/metrics', isAuthManager,(req, res)=>{
        res.render('metrics.ejs', {user : req.session.user})
    })

    app.get('/getchecked', isAuthManager, async(req, res)=>{
        res.render('getchecked.ejs', {user : req.session.user})
    })

    app.get('/getUsStates', async(req, res)=>{
        res.send(usStates)
    })

    //POSTS----------------------->
    app.post('/getallchecked', async(req, res)=>{
        try{
            const result = await searchByChecked(req, res)
            res.send(result.rows)
        }
        catch(err){
            console.log(err)
        }
    })

    app.post('/register', (req, res)=>{
        try{
            pgProgram.insertNewUser(req, res)
            
        }
        catch(error){console.log(error)}
    })

	app.post('/app', async(req, res) => {
        try{
            if(req.session.user == undefined){
                res.send({"message":"undefined"})
            }else{
                var searchResult = await pgProgram.searchByParcel(req.body.parcelid, res)
                if(searchResult == undefined){
                pgProgram.addOnDatabase(req.session.user, req, res)
                }else{
                pgProgram.editDB(req.session.user, req, res)
            }
            }
            
        }
        catch(error){
	        console.log(req.session.user, error)
	    }
    })

	app.post('/searchbyuser', async(req,res) => {
        try{
            const userDate = await req.body
            console.log(req.session.user, 'searched by user', userDate.user)
            const result = await pgProgram.searchTableByUser(userDate.user, userDate.date, res)
            res.send(result)
        }
            catch(error){
            console.log(error)
	    }
    })
    
    app.post('/', async(req,res) => {
        const resultado = await pgProgram.selectUser(req, res)
        if(req.body.user == resultado.username){
                req.session.isAuth = true
                req.session.user = `${resultado.username}`
                await pgProgram.add2Log(req.session.user, 'V.A', 'LOGIN');
                res.send('OK')
        }else{
            if(req.body.pass !== resultado.password){
                console.log('incorrect password')
            }else{
                console.log(resultado.username, 'incorrect user')
            }
        }
    })

    app.post('/editrank2', async(req,res) => {
        pgProgram.editRank2(req, res)
        console.log(req.session.user, 'edited rank 2')
    })

    app.post('/editrank3', async(req,res) => {
        pgProgram.editRank3(req, res)
        console.log(req.session.user, 'edited rank 3')
    })

    app.post('/userlogs', (req, res) => {
        pgProgram.searchLogs(req.body.user, req, res)
        console.log(req.session.user, 'searched logs')
    })

    app.post('/searchbyrank', async(req, res) => {
        try{
            const rankInfo = await req.body
            pgProgram.searchTableByRank(rankInfo.rank, rankInfo.date, rankInfo.ranktype, res)
            console.log(req.session.user, 'searched data by rank one')
        }
            catch(error){
            console.log(error)
	    }
    })

    app.post('/login', async(req, res) => {
        const resultado = await pgProgram.selectManager(req, res)
        if(req.body.user !== resultado.username){
            console.log(resultado.username,'incorrect user')
        }else{
            if(req.body.pass !== resultado.password){
                console.log('incorrect password')
            }else{
                req.session.isAuthManager = true
                req.session.user = `${resultado.username}`
                res.send('OK')
            }
        }
    })

    app.post('/logoff', async(req, res) => {
        await add2Log(req.session.user, 'V.A', 'LOGOUT')
        console.log(req.session.user, 'deslogado')
        req.session.destroy();
    })

    app.post('/appgetlogs', async(req, res) => {
        pgProgram.searchLogs(req.session.user, req, res)
    })

    app.post('/searchbyparcelapp', async(req,res)=>{
        var searchResult = await pgProgram.searchByParcel(req.body.parcelid, res)
        console.log(req.session.user, ' searched ', req.body)
        res.send(searchResult)
    })

    app.post('/searchbyparcel', async(req, res) => {
        const parcel = await pgProgram.searchByParcel(req.body.parcel, res)
        //console.log(parcel)
        res.send(parcel)
    })

    app.post('/searchbycounty', async(req, res) => {
        const countyResult = await pgProgram.searchByCounty(req.body.county, res)
        console.log(req.session.user, 'searched by county')
        res.send(countyResult)
    })

    app.post('/dailymetrics', async(req, res)=> {
        try{
            console.log('daily metrics fetch')
            const date = new Date(req.body.date)
            const day = ("0" + (date.getDate() + 1)).slice(-2)
            const month = ("0" + (date.getMonth() + 1)).slice(-2)
            const yyyymmdd = `${date.getFullYear()}-${month}-${day}`;
            const result = await pgProgram.dailySearch(req.body.user, yyyymmdd);
            console.log(result.rows)
            res.send(result.rows)
        }
        catch(err){
            console.log(err)
        }
    })

    app.post('/metrics', async(req, res)=> {
        try{
            //console.log('monthly metrics fetch')
            const date = new Date(req.body.date)
            const month = date.getMonth()+1
            const result = await pgProgram.resumedSearch(req.body.user, month)//month
            res.send(result.rows)
        }
        catch(err){
            console.log(err)
        }
    })

    app.post('/getUsCounties', async(req, res)=>{
        var arr = []
        for (var i = 0; i < usCounties.features.length; i++) {
            var countiesIndex = usCounties.features[i]
            var stateNumber = countiesIndex.properties.STATE
            var countyName =  countiesIndex.properties.NAME
            
            if(stateNumber == req.body.stateNumber){
                arr.push(`{"name":"${countyName}"}`)
            }
        }
        const jsonStr = `{"data":[${arr}]}`
        res.send(jsonStr)
    })
}
//