const session = require('express-session')
const { searchTable, insertNewUser, getUsers, selectUser, editRank2, addOnDatabase, searchLogs, add2Log, editDB } = require('../models/pgfunctions')
const isAuth = require('../models/is-auth')
const isAuthManager = require('../models/is-auth-manager')
pgProgram = require('../models/pgfunctions')

module.exports = app => {
     //GETS----------------------->
    app.get('/', (req, res) => {
        res.render('index.ejs')
    })

    app.get('/app', isAuth, async(req, res) => {
        await pgProgram.add2Log(req.session.user, 'V.A', 'LOGIN');
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

    app.get('/searchbyrankone', isAuthManager, (req, res) => {
        res.render('searchbyrankone.ejs', {user : req.session.user})
    })

    app.get('/login', (req, res) => {
        res.render('manager-login-page.ejs')
    })

    //POSTS----------------------->
    app.post('/register', (req, res)=>{
        try{
            pgProgram.insertNewUser(req, res)
            
        }
        catch(error){console.log(error)}
    })

	app.post('/app', async(req, res) => {
        try{
            var searchResult = await pgProgram.searchByParcel(req.body.parcelid, res)
            if(searchResult == undefined){
                pgProgram.addOnDatabase(req.session.user, req)
            }else{
                editDB(req.session.user, req, res)
            }
	        
        }
        catch(error){
	        console.log(req.session.user, error)
	    }
    })

	app.post('/searchbyuser', async(req,res) => {
        try{
            const userDate = await req.body
            pgProgram.searchTableByUser(userDate.user, userDate.date, res)
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

    app.post('/allusers', (req, res) => {
        pgProgram.allUsers(res)
        console.log(req.session.user, 'searched all users')
    })

    app.post('/searchbyrankone', async(req, res) => {
        try{
            const rankDate = await req.body
            pgProgram.searchTableByRankOne(rankDate.rank, rankDate.date, res)
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
        res.send(searchResult)
    })
}
//