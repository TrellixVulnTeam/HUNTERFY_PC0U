pgProgram = require('../models/pgfunctions')

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('index.ejs')
    })

    app.get('/app', (req, res) => {
        res.render('app.ejs')
    })

    app.post('/app', (req,res) => {
        async function printarBody(req){
	    const terreno = await req.body
	    console.log(terreno.parcelid)

        }
        try{
            printarBody(req)
	    pgProgram.addOnDatabase(req)
            
        }
        catch(error){
	console.log(error)
	}
        

        
    })
}
