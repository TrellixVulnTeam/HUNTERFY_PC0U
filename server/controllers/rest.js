module.exports = app => {
    app.get('/', (req, res) => res.send('voce esta na realizando um get na rota de terrenos'))

    app.post('/', (req,res) => {
        console.log(req.body)
        res.send(req.body)

} )
}