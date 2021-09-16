const { searchTable, insertNewUser, getUsers } = require('../models/pgfunctions')

pgProgram = require('../models/pgfunctions')

module.exports = app => {

    //GETS----------------------->
    app.get('/', (req, res) => {
        res.render('index.ejs')
    })

    app.get('/app', (req, res) => {
        res.render('app.ejs')
    })

    app.get('/manager', (req, res) => {
        res.render('manager.ejs')
    })
    
    app.get('/register', (req, res) => {
        res.render('register.ejs')
    })

    app.get('/searchbyuser', (req, res) => {
        res.render('searchbyuser.ejs')
    })

    //POSTS----------------------->
    app.post('/register', (req, res)=>{
        try{
            insertNewUser(req, res)
            getUsers(req, res)
        }
        catch(error){console.log(error)}
    })

	app.post('/app', (req) => {
	    console.log(req.body)
        try{
	        pgProgram.addOnDatabase(req)
        }
        catch(error){
	        console.log(error)
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
        try{
            console.log(req.body)
            res.redirect('/app')
        }
        catch(error){
            console.log(error)
        }
    })
}
