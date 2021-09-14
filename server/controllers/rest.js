const { searchTable, insertNewUser, getUsers } = require('../models/pgfunctions')

pgProgram = require('../models/pgfunctions')

module.exports = app => {
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
           // printarBody(req)
	        pgProgram.addOnDatabase(req)

            
        }
        catch(error){
	        console.log(error)
	    }
    })

	app.post('/manager', async(req,res) => {
        try{
            const userDate = await req.body
            pgProgram.searchTable(userDate.user, userDate.date, res)

        }
            catch(error){
            console.log(error)
	    }
    })    
}
