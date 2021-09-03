const customExpress = require("./config/customExpress")
const dbClient = require("./database/connectionPG")
const connection = require('./database/connectionPG')
const tables = require('./database/pgTables')


dbClient.connect(error => {
    if(error){
        console.log(console.log(error))
    }
    else{
        console.log('conectado')
        const app = customExpress()


        
        app.listen(3000, ()=> console.log('servidor rodando na porta 3000'))
        tables.init(connection)
    }
})



