const session = require('express-session')
const { searchTable, insertNewUser, getUsers, selectUser, editRank2, addOnDatabase, searchLogs, add2Log, editDB, searchByChecked, resumedSearch, dailySearch, addTemplate } = require('../models/pgfunctions')
const isAuth = require('../models/is-auth')
const isAuthManager = require('../models/is-auth-manager')
const usStates = require('../database/geojson/us_states.json')
const usCounties = require('../database/geojson/us_counties.json')
const { json } = require('body-parser')
const pgProgram = require('../models/pgfunctions')
const xlsx = require('xlsx')
const fs = require('fs');
var json2xls = require('json2xls');

module.exports = app => {
     //GETS----------------------->
        //GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS
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

    app.get('/searchbyrank', (req, res) => {
        res.render('searchbyrank.ejs', {user : req.session.user})
    })

    app.get('/login', (req, res) => {
        res.render('manager-login-page.ejs')
    })

    app.get('/searchbyparcel', isAuthManager, (req, res) => {
        res.render('searchbyparcel.ejs', {user : req.session.user})
    })

    app.get('/searchbycounty', isAuthManager, (req, res) => {
        res.render('searchbycounty.ejs', {user : req.session.user})
    })

    app.get('/metrics', isAuthManager,(req, res)=>{
        res.render('metrics.ejs', {user : req.session.user})
    })

    app.get('/getchecked', async(req, res)=>{
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

    app.get('/searchbystatus', isAuthManager, async(req, res)=>{
        res.render('searchbystatus.ejs', {user : req.session.user})
    })

    app.get('/searchbyflow', isAuthManager, async(req, res)=>{
        res.render('searchbyflow.ejs', {user : req.session.user})
    })

    app.get('/templates', isAuthManager, async(req, res)=>{
        res.render('templates.ejs', {user : req.session.user})
    })

    app.get('/manageusers', isAuthManager, async(req, res)=>{
        res.render('manageusers.ejs', {user : req.session.user})
    })

    app.get('/countycalendarbystate', isAuthManager, async(req, res)=> {
        res.render('countycalendarbystate.ejs', {user : req.session.user})
    })

    app.get('/parcellist', isAuthManager, async(req, res)=>{
        res.render('parcellist.ejs', {user : req.session.user})
    })

    app.get('/parcellistbysuper', isAuthManager, async(req, res)=>{
        res.render('parcellistbysuper.ejs', {user : req.session.user})
    })

    app.get('/calendar', isAuthManager, async(req,res)=>{
        res.render('calendar.ejs', {user : req.session.user})
    })
    
    app.get('/managermetrics', isAuthManager,  async(req, res)=>{
        res.render('managerMetrics.ejs', {user : req.session.user})
    })

    app.get('/resumedsearchbycountyandrank', isAuthManager,  async(req, res)=>{
        res.render('resumedsearchbycountyandrank.ejs', {user : req.session.user})
    })

    app.get('/searchbyrankandcounty', async(req, res)=>{
        res.render('searchbyrankandcounty.ejs', {user : req.session.user})
    })

    app.get('/countystatus', isAuthManager,  async(req, res)=>{
        res.render('countystatus.ejs', {user : req.session.user})
    })

    app.get('/searchbyrankcountyflow', async(req, res) => {
        res.render('searchbyrankcountyflow.ejs', {user : req.session.user})
    })

        //GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS//GET VIEWS

        //GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS
    app.get('/getallusers', (req, res) => {
        pgProgram.getUsers(req, res)
        console.log(req.session.user, 'searched all users')
    })

    app.get('/getallmanagers', (req, res) => {
        pgProgram.getUsersManager(req, res)
        console.log(req.session.user, 'searched all managers')
    })

    app.get('/getproduction', async(req, res) => {
        try{
            const date = new Date()
            const day = ("0" + date.getDate()).slice(-2)
            const month = ("0" + (date.getMonth() + 1)).slice(-2)
            const yyyymmdd = `${date.getFullYear()}-${month}-${day}`
            //console.log(yyyymmdd)
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

    app.get('/stageCount', async(req, res)=>{
        const stage1Count = await pgProgram.countStage('Stage 1')
        const stage2Count = await pgProgram.countStage('Stage 2')
        const stage3Count = await pgProgram.countStage('Stage 3')

        const result = [stage1Count.rows[0], stage2Count.rows[0], stage3Count.rows[0]]
        res.send(result)
    })

    app.get('/stageRankCount', async(req, res)=>{
        const stage1rank = [await pgProgram.countRankStage('Stage 1', 'rank1', 'A'), await pgProgram.countRankStage('Stage 1', 'rank1', 'B'), await pgProgram.countRankStage('Stage 1', 'rank1', 'C'), await pgProgram.countRankStage('Stage 1', 'rank1', 'HOUSE')]
        const stage2rank = [await pgProgram.countRankStage('Stage 2', 'rank2', 'A'), await pgProgram.countRankStage('Stage 2', 'rank2', 'B'), await pgProgram.countRankStage('Stage 2', 'rank2', 'C'), await pgProgram.countRankStage('Stage 2', 'rank2', 'HOUSE')]
        const stage3rank = [await pgProgram.countRankStage('Stage 3', 'rank3', 'A'), await pgProgram.countRankStage('Stage 3', 'rank3', 'B'), await pgProgram.countRankStage('Stage 3', 'rank3', 'C'), await pgProgram.countRankStage('Stage 3', 'rank3', 'HOUSE')]
        res.send([stage1rank, stage2rank, stage3rank])
    })

    app.get('/countAll', async(req, res)=>{
        const result = await pgProgram.countAll()
        res.send(result)
    })

    app.get('/getCalendar', async(req,res)=>{
        const result = await pgProgram.getCalendar()
        res.send(result)
    })

    app.get('/getYesterdayTotals', async(req, res)=>{
        const result = await pgProgram.getTotalLogs()
        res.send(result)
    })

        //GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS//GET FUNCTIONS

    
    //POSTS----------------------->

        //INSERT INFO //INSERT INFO //INSERT INFO //INSERT INFO //INSERT INFO


    app.post('/register', (req, res)=>{ //INSERT NEW MANAGER
        try{
            pgProgram.insertNewUser(req, res)
            
        }
        catch(error){console.log(error)}
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

    app.post('/registerva', (req, res)=>{ //INSERT NEW VA
        try{
            pgProgram.insertNewVA(req.body.user, req.body.password, req.body.supervisor)
            console.log('registerVA', req.body)
        }
        catch(err){
            console.log(err)
        }
    })

    app.post('/editrank2', async(req,res) => { //NEW RANK
        pgProgram.editRank2(req, res)
        pgProgram.insertParcelLog(req.body.parcelid, req.body.userrank2, 'rank 2 edit')
        console.log(req.session.user, 'edited rank 2')
    })

    app.post('/editrank3', async(req,res) => { //NEW RANK
        pgProgram.editRank3(req, res)
        pgProgram.insertParcelLog(req.body.parcelid, req.body.userrank3, 'rank 3 edit')
        console.log(req.session.user, 'edited rank 3')
    })
    app.post('/app', async(req, res) => { //NEW PARCEL
        try{
            if(req.session.user == undefined){
                res.send({"message":"undefined"})
            }else{
                const searchResult = await pgProgram.checkIfExists(req.body.parcelid, req.body.state, req.body.county)
                if(searchResult.length < 1){
                    pgProgram.addOnDatabase(req.session.user, req, res)
                    pgProgram.checkDone(req.session.user, req.body.parcelid, req.body.state, req.body.county)
                }
                else{
                    pgProgram.editDB(req.session.user, req, res)
                    pgProgram.checkDone(req.session.user, req.body.parcelid, req.body.state, req.body.county)
                }
            }
        }
        catch(error){
            console.log(req.session.user, error)
        }
    })
    
    app.post('/savetemplate', async(req, res)=>{ //ADD TEMPLATE
        pgProgram.addTemplate(req.body.templatename, req.body.template, req.body.envelopeinfo)
    })

    app.post('/logoff', async(req, res) => { //ADD LOGOUT LOG
        await add2Log(req.session.user, 'V.A', 'LOGOUT')
        console.log(req.session.user, 'deslogado')
        req.session.destroy();
        pgProgram.insertParcelLog('0', req.session.user, 'logout')
    })

    app.post('/editstatus', async(req, res)=>{ 
        await pgProgram.insertStatus(req.body.status, req.body.parcelid)
    })

    app.post('/postcalendar', async(req, res)=>{ //ADD CALENDAR ENTRY
        const calendarInfo = await pgProgram.getCalendar(req.body.date)
        res.send(calendarInfo)
    })

    app.post('/saveletterlog', async(req, res)=>{ //ADD LETTERLOG
        await pgProgram.insertLetterLog(req.body.parcelid, req.body.template)
    }) 

    app.post('/postacqdata', async(req, res)=>{ //ADD AQC DATA
        pgProgram.postAcqData(req.body.parcelid, req.body.state, req.body.county, req.body.offervalue, req.body.offerdate, req.body.counteroffervalue, req.body.counterofferdate, req.body.pdf, req.body.deeddate)
        pgProgram.insertParcelLog(req.body.parcelid, req.session.user, 'acquisiton data updated')
    })

    app.post('/newlist', async(req, res)=>{ //ADD PARCELS LIST
        for (let i = 0; i < req.body.length; i++) {
            var index = req.body[i]
            await pgProgram.insertParcelList(index.parcel, index.user, index.state, index.county)
            pgProgram.insertParcelLog("0", req.session.user, 'list insertion')
        }
    })

    app.post('/saveCalendar', async(req, res)=>{ //SAVE CALENDAR OBJECT
        //console.log(req.body)
        const str = JSON.stringify(req.body)
        //console.log(str)
        await pgProgram.updateCalendar(str)
    })

    app.post('/savePDFondirectory', async(req, res)=>{ //SAVE PDF ON DIRECTORY TABLE
        console.log('pdf saved')
        await pgProgram.saveOnPDFDirectory(req.body.state, req.body.county, req.body.pdf, req.body.title, req.body.link)
    })

        //INSERT INFO //INSERT INFO //INSERT INFO //INSERT INFO //INSERT INFO //INSERT INFO





        //SEARCH METHODS //SEARCH METHODS//SEARCH METHODS//SEARCH METHODS//SEARCH METHODS//SEARCH METHODS//SEARCH METHODS


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

    app.post('/searchbyuserdate', async(req, res) => {
        try{
            console.log(req.session.user, 'searched by user', req.body.user)
            const result = await pgProgram.searchByUserDate(req.body.user, req.body.date)
            res.send(result)
        }
        catch(err){
            console.log(err)
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

    app.post('/searchbyparcelapp', async(req,res)=>{
        var searchResult = await pgProgram.searchByParcel(req.body.parcelid, res)
        console.log(req.session.user, ' searched ', req.body)
        res.send(searchResult)
    })
    
    app.post('/searchbyparcel', async(req, res) => {
        const result = await pgProgram.searchByParcel(req.body.parcel, res)
        console.log(req.body.parcel, 'searched')
        res.send(result)
    })
    
    app.post('/searchbycounty', async(req, res) => {
        if(req.body.county == 'all'){
            const result = await pgProgram.searchByState(req.body.state)
            res.send(result)
        }
        else{
            const result = await pgProgram.searchByCounty(req.body.county, req.body.state)
            res.send(result)
        }
        
        console.log(req.session.user, 'searched by county')
    })
        
    app.post('/searchbylisttype', async(req, res)=>{
        const result = await pgProgram.searchByType(req.body.listtype, req.body.date, req.body.page)
        res.send(result)
    })
    
    app.post('/searchbyflow', async(req, res)=>{
        const result = await pgProgram.searchByFlow(req.body.flow)
        res.send(result)
    })

    app.post('/searchbyrankandcounty', async(req, res)=>{
        if(req.body.county == 'all'){
            const result = await pgProgram.searchByStateAndRank(req.body.state, req.body.ranktype, req.body.rank)
            res.send(result)
        }
        else{
            const result = await pgProgram.searchByCountyAndRank(req.body.state, req.body.county, req.body.ranktype, req.body.rank)
            res.send(result)
        }
    })

    app.post('/searchbyrankcountyflow', async(req, res)=>{
        if(req.body.county == 'all'){
            const result = await pgProgram.searchByStateRankFlow(req.body.state, req.body.ranktype, req.body.rank, req.body.flow)
            res.send(result)
        }
        else{
            const result = await pgProgram.searchByCountyRankFlow(req.body.state, req.body.county, req.body.ranktype, req.body.rank, req.body.flow)
            res.send(result)
        }
    })

    app.post('/getallchecked', async(req, res)=>{
        try{
            if(req.body.county == 'all'){
                const result = await pgProgram.searchByCheckedState(req.body.state)
                res.send(result)
            }
            else{
                const result = await pgProgram.searchByCheckedCounty(req.body.state, req.body.county)
                res.send(result)
            } 
        }
        catch(err){
            console.log(err)
        }
    })


        //SEARCH METHODS //SEARCH METHODS//SEARCH METHODS//SEARCH METHODS//SEARCH METHODS//SEARCH METHODS//SEARCH METHODS
















    app.post('/', async(req,res) => { 
        const resultado = await pgProgram.selectUser(req, res)
        if(req.body.user == resultado.username){
                req.session.isAuth = true
                req.session.user = `${resultado.username}`
                await pgProgram.add2Log(req.session.user, 'V.A', 'LOGIN');
                res.send(resultado)
        }else{
            if(req.body.pass !== resultado.password){
                console.log('incorrect password')
            }else{
                console.log(resultado.username, 'incorrect user')
            }
        }
    })

    app.post('/userlogs', (req, res) => {
        pgProgram.searchLogs(req.body.user, req, res)
        console.log(req.session.user, 'searched logs')
    })

    app.post('/searchbyrank', async(req, res) => {
        try{
            const result = await pgProgram.searchByRank(req.body.ranktype, req.body.rank)
            console.log(req.session.user, 'searched data by rank one')
            res.send(result)
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
                pgProgram.insertParcelLog('0', req.session.user, 'login')
            }
        }
    })   

    app.post('/appgetlogs', async(req, res) => {
        pgProgram.searchLogs(req.session.user, req, res)
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

    app.post('/managersdailymetrics', async(req, res)=> {
        try{
            console.log('manager daily metrics fetch')
            const result = await pgProgram.managerDailySearch(req.body.user, req.body.date);
            res.send(result.rows)
        }
        catch(err){
            console.log(err)
        }
    })

    app.post('/managermetrics', async(req, res)=> {
        try{
            const date = new Date(req.body.date)
            const month = date.getMonth()+1
            const result = await pgProgram.parcelLogsSearch(req.body.user, month)//month
            //console.log(result)
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
        //console.log(countStr)
        res.send(countStr)
    })

    app.post('/dailyRankCount', async(req, res)=>{
        const info = await req.body
        const count = await pgProgram.rankCount(info.rank, info.date ,info.ranktype)
        const countStr = `${count}`
        //console.log(countStr)
        res.send(countStr)
    })

    app.post('/dailyCountyCount', async(req, res)=>{
        //console.log(req.body)
        const count = await pgProgram.countyCount(req.body.county, req.body.state)
        res.send(count[0].count)
    })

    app.post('/dailyCheckedCount', async(req, res)=>{
        const count = await pgProgram.checkedCount(req)
        const countStr = `${count}`
        //console.log(countStr)
        res.send(countStr)
    })

    app.post('/countyandrankcount', async(req, res)=>{
        const count = await pgProgram.countyRankCount(req.body.rank, req.body.ranktype, req.body.state, req.body.county)
        const countStr = `${count}`
        //console.log(countStr)
        res.send(countStr)
    })

    app.post('/searchbylisttypecount', async(req, res)=>{
        const info = await req.body
        const count = await pgProgram.typeCount(info.listtype, info.date)
        const countStr = `${count}`
        //console.log(countStr)
        res.send(countStr)
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

    app.post('/letterlogs', async(req, res)=>{
        //console.log(req.body)
        const result = await pgProgram.getLetterLogs(req.body.parcelid)
        res.send(result)
    })

    app.post('/downloadpdf', async(req, res)=>{
        const result = await pgProgram.getPdf(req.body.parcelid, req.body.state, req.body.county)
        pgProgram.insertParcelLog('0', req.session.user, 'downloaded deed pdf')
        res.send(result)
    })

    app.post('/searchbyflowcount', async(req, res)=>{
        const count = await pgProgram.flowCount(req.body.flow)
        const countStr = `${count}`
        res.send(countStr)
    })

    app.post('/getlistinfo', async(req, res)=>{
        const date = new Date()
        const day = ("0" + date.getDate()).slice(-2)
        const month = ("0" + (date.getMonth() + 1)).slice(-2)
        const yyyymmdd = `${date.getFullYear()}-${month}-${day}`
        
        const result = await pgProgram.getList(req.body.user, yyyymmdd)
        res.send(result)
    })

    app.post('/clearlist', async(req, res)=>{
        const date = new Date()
        const day = ("0" + date.getDate()).slice(-2)
        const month = ("0" + (date.getMonth() + 1)).slice(-2)
        const yyyymmdd = `${date.getFullYear()}-${month}-${day}`
        await pgProgram.clearList(req.body.user, yyyymmdd)
        pgProgram.insertParcelLog('0', req.session.user, 'list cleared')
    })

    app.post('/getdirectorylist', async(req, res)=>{
        const result = await pgProgram.getDirectoryList(req.body.state, req.body.county)
        res.send(result.rows)
    })

    app.post('/downloaddirectorypdf', async(req, res)=>{
        const result = await pgProgram.getDirectoryPDFFile(req.body.state, req.body.county, req.body.title)
        res.send(result.rows[0])
    })

    app.post('/deletedirectorypdf', async(req, res)=>{
        const result = await pgProgram.deleteDirectoryPDFFile(req.body.state, req.body.county, req.body.title)
        res.send(result.rows[0])
    })

    app.post('/directorycheckdone', async(req, res)=>{
        const result = await pgProgram.directoryCheckDone(req.body.state, req.body.county)
    })

    app.post('/directoryuncheckdone', async(req, res)=>{
        const result = await pgProgram.directoryUncheckDone(req.body.state, req.body.county)
    })

    app.post('/seeifisdone', async(req, res)=>{
        const result = await pgProgram.checkAllDirectoryDone()
        res.send(result)
    })

    app.post('/downloadsheetbycountyandrank', async(req, res)=>{
        console.log('fetch')
        const result = await pgProgram.data2DownByRankAndCounty(req.body.state, req.body.county, req.body.ranktype, req.body.rank)
        res.send(result)
        
        

       
    })
}
//