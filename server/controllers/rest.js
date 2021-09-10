const { searchTable } = require('../models/pgfunctions')

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

	app.post('/app', (req,res) => {
	    console.log(req.body)
        try{
            printarBody(req)
	        pgProgram.addOnDatabase(req)
            
        }
        catch(error){
	        console.log(error)
	    }
    })

	app.post('/manager', async(req,res) => {
        try{
            const userDate = await req.body
            const pgresults = await pgProgram.searchTable(userDate.user, userDate.date)  
            res.send(pgresults) 
        }
            catch(error){
            console.log(error)
	    }
    })    
}
