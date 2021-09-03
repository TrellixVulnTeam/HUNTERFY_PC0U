pgProgram = require('../models/pgfunctions')

module.exports = app => {
    app.get('/', (req, res) => {
        res.send('voce esta na realizando um get na rota de terrenos')
        pgProgram.printTable(res.body)
    })

    app.post('/', (req,res) => {
        const terreno = req.body
        pgProgram.addOnDatabase()
        console.log(terreno)
        res.send('ok')

        
    })
}