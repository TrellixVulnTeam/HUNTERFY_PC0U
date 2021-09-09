const dbClient = require('../database/connectionPG')

class pgProgram{
    addOnDatabase(req){
    var terreno = req.body	    
    let insertQuery = `insert into hunterfyterrenos(user_id, PARCELID, FLOODZONE) 
                       values('gvmolinadmin', '${terreno.parcelid}', 'teste')`

    dbClient.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
   dbClient.end;
    
    
    
    
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
