const dbClient = require('../database/connectionPG')

class pgProgram{
    addOnDatabase(adiciona){
        var inf1 = 'gvmolinadmin'
        var inf2 = '8989898989898'
        var inf3 = 'minimo'
        const pgRow = `INSERT INTO hunterfyterrenos("user_id", "PARCELID", "FLOODZONE") VALUES('${inf1}', '${inf2}', '${inf3}');`
        dbClient.query(pgRow, adiciona, (error, result) => {
            if(error){
                console.log(error)
            }
            else{
                console.log(result)
            }
        })
    }

    printTable(db){
        const sql = 'select * from hunterfyterrenos'
        dbClient.query(sql, db, (error, result) => {
            if(error){
                console.log(error)
            }
            else{
                console.log(result)
            }
        })
        
            
    }

}

module.exports = new pgProgram