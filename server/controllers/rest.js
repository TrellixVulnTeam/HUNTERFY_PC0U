const session = require('express-session')
const { searchTable, insertNewUser, getUsers, selectUser, editRank2, addOnDatabase, searchLogs, add2Log, editDB, searchByChecked, resumedSearch, dailySearch, addTemplate } = require('../models/pgfunctions')
const isAuth = require('../models/is-auth')
const isAuthManager = require('../models/is-auth-manager')
const isAuthPost = require('../models/is-auth-post')
const usStates = require('../database/geojson/us_states.json')
const usCounties = require('../database/geojson/us_counties.json')
const { json } = require('body-parser')
pgProgram = require('../models/pgfunctions')

module.exports = app => {
     //GETS----------------------->
        //GET VIEWS
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

    app.get('/searchbyrank', isAuthManager, (req, res) => {
        res.render('searchbyrank.ejs', {user : req.session.user})
    })

    app.get('/login', (req, res) => {
        res.render('manager-login-page.ejs')
    })

    app.get('/searchbyparcel', (req, res) => {
        res.render('searchbyparcel.ejs', {user : req.session.user})
    })

    app.get('/searchbycounty', (req, res) => {
        res.render('searchbycounty.ejs', {user : req.session.user})
    })

    app.get('/metrics', isAuthManager,(req, res)=>{
        res.render('metrics.ejs', {user : req.session.user})
    })

    app.get('/getchecked', isAuthManager, async(req, res)=>{
        res.render('getchecked.ejs', {user : req.session.user})
    })

    app.get('/searchbyrankresumed', isAuthManager, async(req, res) => {
        res.render('searchbyrankresumed.ejs', {user : req.session.user})
    })

    app.get('/countycalendar', isAuthManager, async(req, res)=> {
        res.render('countycalendar.ejs', {user : req.session.user})
    })

    app.get('/resumedsearchbycounty', isAuthManager, async(req, res)=>{
        res.render('resumedsearchbycounty.ejs', {user : req.session.user})
    })

    app.get('/searchbylisttype', isAuthManager, async(req, res)=>{
        res.render('searchbytype.ejs', {user : req.session.user})
    })

    app.get('/searchbystatus', async(req, res)=>{
        res.render('searchbystatus.ejs', {user : req.session.user})
    })

    app.get('/templates', async(req, res)=>{
        res.render('templates.ejs', {user : req.session.user})
    })

    app.get('/manageusers', async(req, res)=>{
        res.render('manageusers.ejs', {user : req.session.user})
    })

    app.get('/countycalendarbystate', async(req, res)=> {
        res.render('countycalendarbystate.ejs', {user : req.session.user})
    })

        //GET FUNCTIONS
    app.get('/getallusers', (req, res) => {
        pgProgram.getUsers(req, res)
        console.log(req.session.user, 'searched all users')
    })

    app.get('/getallmanagers', (req, res) => {
        pgProgram.getUsersManager(req, res)
        console.log(req.session.user, 'searched all managers')
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

    app.get('/getUsStates', async(req, res)=>{
        res.send(usStates)
    })

    app.get('/gettemplates', async(req, res)=>{
        const result = await pgProgram.getTemplates()
        //console.log(result)
        res.send(result)
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

    app.post('/registerva', (req, res)=>{
        try{
            pgProgram.insertNewVA(req.body.user, req.body.password, req.body.supervisor)
            console.log('registerVA', req.body)
        }
        catch(err){
            console.log(err)
        }
    })

    app.post('/registermanager', (req, res)=>{
        try{
            pgProgram.insertNewManager(req.body.user, req.body.password)
            console.log('registerManager', req.body)
        }
        catch(err){
            console.log(err)
        }
    })

	app.post('/app', async(req, res) => {
        try{
            if(req.session.user == undefined){
                res.send({"message":"undefined"})
            }else{
                const searchResult = await pgProgram.checkIfExists(req.body.parcelid, req.body.state, req.body.county)
                if(searchResult.length < 1){
                    pgProgram.addOnDatabase(req.session.user, req, res)
                }
                else{
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
            const result = await pgProgram.searchTableByUser(userDate.user, userDate.date, userDate.page, res)
            res.send(result)
        }
            catch(error){
            console.log(error)
	    }
    })

    app.post('/searchbystatus', async(req,res) => {
        try{
            console.log(req.session.user, 'searched by status', req.body.status, req.body.county)
            const result = await pgProgram.searchByStatus(req.body.status, req.body.state, req.body.county, req.body.page)
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
            pgProgram.searchTableByRank(rankInfo.rank, rankInfo.date, rankInfo.ranktype, rankInfo.page, res)
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
        const countyResult = await pgProgram.searchByCounty(req.body.county, req.body.state, req.body.page)
        console.log(req.session.user, 'searched by county')
        res.send(countyResult)
    })

    app.post('/dailymetrics', async(req, res)=> {
        try{
            console.log('daily metrics fetch')
            const result = await pgProgram.dailySearch(req.body.user, req.body.date);
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

    app.post('/dailyUserCount', async(req, res)=>{
        const info = await req.body
        const count = await pgProgram.dailyCount(info.user, info.date)
        const countStr = `${count}`
        console.log(countStr)
        res.send(countStr)
    })

    app.post('/dailyRankCount', async(req, res)=>{
        const info = await req.body
        const count = await pgProgram.rankCount(info.rank, info.date ,info.ranktype)
        const countStr = `${count}`
        console.log(countStr)
        res.send(countStr)
    })

    app.post('/dailyCountyCount', async(req, res)=>{
        const info = await req.body
        const count = await pgProgram.countyCount(info.county)
        const countStr = `${count}`
        console.log(countStr)
        res.send(countStr)
    })

    app.post('/dailyCheckedCount', async(req, res)=>{
        const info = await req.body
        const count = await pgProgram.checkedCount(info.county)
        const countStr = `${count}`
        console.log(countStr)
        res.send(countStr)
    })

    app.post('/searchbyrankresumed', async(req, res) => {
        pgProgram.searchTableByRankResumed(req.body.rank, req.body.date, req.body.ranktype, req.body.page, res)
    })

    app.post('/searchbycountyresumed', async(req, res) => {
        const result = await pgProgram.searchByCountyResumed(req.body.county, req.body.page)
        res.send(result)
    })

    app.post('/postcalendar', async(req, res)=>{
        const calendarInfo = await pgProgram.getCalendar(req.body.date)
        res.send(calendarInfo)
    })

    app.post('/searchbylisttype', async(req, res)=>{
        const result = await pgProgram.searchByType(req.body.listtype, req.body.date, req.body.page)
        res.send(result)
    })

    app.post('/searchbylisttypecount', async(req, res)=>{
        const info = await req.body
        const count = await pgProgram.typeCount(info.listtype, info.date)
        const countStr = `${count}`
        console.log(countStr)
        res.send(countStr)
    })

    app.post('/savetemplate', async(req, res)=>{
        pgProgram.addTemplate(req.body.templatename, req.body.template, req.body.envelopeinfo)
    })

    app.post('/deletetemplate', async(req, res)=> {
        //console.log(req.body)
        pgProgram.deleteTemplate(req.body.templatename)
        console.log('template deleted')
    })

    app.post('/deleteva', async(req,res)=>{
        pgProgram.deleteVa(req.body.user)
    })

    app.post('/deletemanager', async(req,res)=>{
        pgProgram.deleteManager(req.body.user)
    })

    app.post('/getstateinfo', async(req, res)=>{
        const info = await pgProgram.getStateCalendar(req.body.state)
        res.send(info.rows)
    })

    app.post('/editstatus', async(req, res)=>{
        await pgProgram.insertStatus(req.body.status, req.body.parcelid)
    })

    app.post('/saveletterlog', async(req, res)=>{
        await pgProgram.insertLetterLog(req.body.parcelid, req.body.template)
    })    

    app.post('/letterlogs', async(req, res)=>{
        //console.log(req.body)
        const result = await pgProgram.getLetterLogs(req.body.parcelid)
        res.send(result)
    })
}
//