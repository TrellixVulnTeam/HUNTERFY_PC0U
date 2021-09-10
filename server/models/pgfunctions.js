const dbClient = require('../database/connectionPG')

class pgProgram{
    addOnDatabase(req){
    var terreno = req.body	    
    let insertQuery = `insert into hunterfyterrenos(
	    user_id,
	    parcelid,
	    gisimg, 
	    gislink, 
	    floodzoneimg, 
	    floodzonetext
    )
                       values(
			       '${terreno.userinfo[0].username}', 
			       '${terreno.parcelid}', 
			       '${terreno.gis[0].gisimg}',
			       '${terreno.gis[0].gislink}',
			       '${terreno.floodzone[0].floodzoneimg}',
			       '${terreno.floodzone[0].floodzonetext}'
			       
		       )`

    dbClient.query(insertQuery, (err, result)=>{
        if(!err){
            console.log('Insertion was successful')
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

    searchTable(user,date){
        const searchQuery = `
		SELECT user_id, parcelid, floodzone, date, dateandtime, gisimg, gislink, floodzoneimg, floodzonetext
		FROM public.hunterfyterrenos
		WHERE user_id = '${user}' AND date = '${date}';
	    `
        dbClient.query(searchQuery, (error, result) => {
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
