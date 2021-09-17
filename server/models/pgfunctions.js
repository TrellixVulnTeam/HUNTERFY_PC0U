const dbClient = require('../database/connectionPG')

class pgProgram{
    addOnDatabase(req){
        var terreno = req.body	    
        let insertQuery = 
        `
        INSERT INTO public."2021-data"(
            username, 
            parcelid, 
            gisimg, 
            gislink, 
            floodzoneimg, 
            floodzonetext, 
            mapsimg, 
            mapslink, 
            streetviewimg, 
            marketvalue, 
            latitude, 
            longitude, 
            acres, 
            adress, 
            n1adress, 
            n2adress, 
            n3adress, 
            n4adress, 
            rank1, 
            obs1,
	        taxowned
            )

            VALUES (
            '${terreno.userinfo[0].username}', 
            '${terreno.parcelid}', 
            '${terreno.gis[0].gisimg}', 
            '${terreno.gis[0].gislink}', 
            '${terreno.floodzone[0].floodzoneimg}', 
            '${terreno.floodzone[0].floodzonetext}', 
            '${terreno.maps[0].mapsimg}', 
            '${terreno.maps[0].mapslink}', 
            '${terreno.streetview[0].streetview}', 
            '${terreno.marketvalue}', 
            '${terreno.latitude}', 
            '${terreno.longitude}', 
            '${terreno.acres}', 
            '${terreno.adress}', 
            '${terreno.adressn1}', 
            '${terreno.adressn2}', 
            '${terreno.adressn3}', 
            '${terreno.adressn4}', 
            '${terreno.rank}', 
            '${terreno.obs}',
	        '${terreno.taxowned}'
            );
        `

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

    searchTableByUser(user, date, res){
        const searchQuery = `
		SELECT parcelid, gisimg, gislink, floodzoneimg, floodzonetext, mapsimg, mapslink, streetviewimg, marketvalue, latitude, longitude, acres, adress, n1adress, n2adress, n3adress, n4adress, rank1, obs1, rank2, userrank2, obs2, rank3, userrank3, obs3, item_id, dateandtime, taxowned
	    FROM public."2021-data"
		WHERE "username" = '${user}' AND date = '${date}';
	    `
        dbClient.query(searchQuery, (error, result) => {
            if(error){
                console.log(error)
            }
            else{		    
	            res.send(result.rows)  
            }
            
        })
        dbClient.end
    }

    insertNewUser(req){
        var user = req.body	    
        let insertQuery = 
        `
        INSERT INTO public.userinfo(
            username, password)
            VALUES ('${user.newusername}', '${user.newpassword}');
        `

        dbClient.query(insertQuery, (err, result)=>{
            if(!err){
                console.log('Insertion was successful')
            }
            else{ console.log(err.message) }
        })
        dbClient.end;
    }

    getUsers(req, res){
        const sql = 'select * from public.userinfo'
        dbClient.query(sql, (error, result) => {
            if(error){
                console.log(error)
            }
            else{
                res.send(result.rows)
            }
        })   
        dbClient.end;
    }
    
    selectUser(req, res){
        var user = req.body	    
        let insertQuery = `
		SELECT username, password
	    FROM public.userinfo
	    WHERE username = '${user.user}';
        `

        dbClient.query(insertQuery, (err, result)=>{
            if(!err){
            //console.log(result.rows)
            res.send(result.rows[0])
            
            }
            else{console.log(err.message)}
        })
        dbClient.end;
    }

    editRank2(req, res){
        var rank2 = req.body
        let insertQuery = `
            UPDATE public."2021-data"
            SET rank2='${rank2.rank2}', userrank2='${rank2.userrank2}', obs2='${rank2.obs2}'
            WHERE parcelid='${rank2.parcelid}';  
        `
        dbClient.query(insertQuery, (err, result)=>{
            if(!err){
            console.log("info updated on DB")
            }
            else{console.log(err.message)}
        })
    }



}

module.exports = new pgProgram
