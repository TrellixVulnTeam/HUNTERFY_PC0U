pgProgram = require('../models/pgfunctions')

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('index.ejs')
    })

    app.get('/app', (req, res) => {
        res.render('app.ejs')
    })

    app.post('../client/app.html', (req,res) => {
        const terreno = req.body
        //pgProgram.addOnDatabase()
        console.log(terreno)
        res.send('ok')

        
    })
}