const customExpress = require("./config/customExpress")
const dbClient = require("./database/connectionPG")
const connection = require('./database/connectionPG')
const tables = require('./database/pgTables')
const app = customExpress()

dbClient.connect(error => {
    if(error){
        console.log(console.log(error))
    }
    else{
        console.log('conectado no banco de dados')
        tables.init(dbClient)
        tables.criarTabela(dbClient)
    }
})
app.listen(process.env.PORT || 5433, ()=> console.log('servidor rodando na porta 3000'))


