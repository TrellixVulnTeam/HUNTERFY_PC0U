const Client = require('pg').Client
const dbClient = new Client({
    user: "postgres",
    password: "123",
    host: "127.0.0.1",
    port: "5432",
    database: "postgres"
})

//dbClient.connect()
//dbClient.query("SELECT * FROM hunterfyterrenos")
//.then(results => {
 //   const resultado = results.rows
  //  console.table(resultado)
//})
//.finally(() => dbClient.end())

async function getTerrenos(){
    try{
        console.log("--iniciando a conexâo com o db")
        await dbClient.connect()
        console.log("--conexão bem sucedida")
        const resultado = await dbClient.query('select * from hunterfyterrenos')
        console.table(resultado.rows)
    }
    catch (ex){
        console.log("--erro na função 'getTerrenos()" + ex)
    }
    finally{
        await dbClient.end()    
        console.log("--cliente desconectado")
    
    }
}

async function insTerreno(inf1, inf2, inf3){
    try{
        console.log("--iniciando a conexâo com o db")
        await dbClient.query(`INSERT INTO hunterfyterrenos("user_id", "PARCELID", "FLOODZONE") VALUES('${inf1}', '${inf2}', '${inf3}');`)
        console.log("linha inserida")
    }
    catch (ex){
        console.log("--erro na função 'getTerrenos()" + ex)
    }
    finally{
        await dbClient.end()    
        console.log("--cliente desconectado")
    
    }
}
//insTerreno("gvmolinadmin", "5477777w7", "3/10")
getTerrenos()