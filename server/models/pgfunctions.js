const dbClient = require('../database/connectionPG')

class pgProgram{
    addOnDatabase(user, req, res){
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
	        taxowned,
            state,
            county,
            floodzonelink,
            zillowlink,
            zestimate,
            hoa,
            watersupply,
            electricitysupply,
            sewerage, ownername, propstream, estimatedarv, gmapdate, gearthlink, showingbuilding, buildingsize, yearbuilt, structuretype, bedrooms, bathrooms, garage, taxesperyear, cadlandvalue, cadbuildingvalue, cadtotalvalue, needtoconfirm, cadimage, listtype
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
            '${terreno.streetviewimg}', 
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
	        '${terreno.taxowned}',
            '${terreno.state}',
            '${terreno.county}',
            '${terreno.floodzone[0].floodzonelink}',
            '${terreno.zillow}',
            '${terreno.zestimate}',
            '${terreno.hoa}',
            '${terreno.watersupply}',
            '${terreno.elecsupply}',
            '${terreno.sewerage}',
            '${terreno.ownername}', 
            '${terreno.propsstream}', 
            '${terreno.estimatedarv}', 
            '${terreno.gmapsdate}', 
            '${terreno.gearthlink}', 
            '${terreno.showingbuilding}', 
            '${terreno.buildingsize}', 
            '${terreno.builtyear}', 
            '${terreno.structuretype}', 
            '${terreno.bedroomsnumber}', 
            '${terreno.bathroomsnumber}', 
            '${terreno.garagesize}', 
            '${terreno.taxesperyear}', 
            '${terreno.cadlandvalue}', 
            '${terreno.cadbuildingvalue}', 
            '${terreno.cadtotalvalue}', 
            '${terreno.needtoconfirm}', 
            '${terreno.cadimage}',
            '${terreno.listtype}'
            );
        `

        dbClient.query(insertQuery, (err, result)=>{
            if(!err){
                console.log(terreno.userinfo[0].username, 'Insertion was successful. Parcel:', terreno.parcelid)
                res.send({"message":"insert"})
            }
            else{ console.log(terreno.userinfo[0].username, err.message, terreno.parcelid) }
        })
        dbClient.end;
    }

    editDB(user, req, res){   
        var newInfo = req.body	    
        var date = new Date()
        var yyyymmdd = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
        var editQuery = `
            UPDATE public."2021-data"
	        SET 
            username2 = '${newInfo.userinfo[0].username}',
            dateandtime2 = '${date}',
            date2 = '${yyyymmdd}',
            gisimg='${newInfo.gis[0].gisimg}',
            gislink='${newInfo.gis[0].gislink}', 
            floodzoneimg='${newInfo.floodzone[0].floodzoneimg}', 
            floodzonetext='${newInfo.floodzone[0].floodzonetext}', 
            mapsimg='${newInfo.maps[0].mapsimg}', 
            mapslink='${newInfo.maps[0].mapslink}', 
            streetviewimg='${newInfo.streetviewimg}', 
            marketvalue='${newInfo.marketvalue}', 
            latitude='${newInfo.longitude}', 
            longitude='${newInfo.longitude}', 
            acres='${newInfo.acres}', 
            adress='${newInfo.adress}', 
            n1adress='${newInfo.adressn1}', 
            n2adress='${newInfo.adressn2}', 
            n3adress='${newInfo.adressn3}', 
            n4adress='${newInfo.adressn4}', 
            rank1='${newInfo.rank}', 
            obs1='${newInfo.obs}',  
            taxowned='${newInfo.taxowned}',
            floodzonelink='${newInfo.floodzone[0].floodzonelink}',
            state='${newInfo.state}',
            county='${newInfo.county}',
            zestimate='${newInfo.zestimate}',
            zillowlink='${newInfo.zillow}',
            hoa = '${newInfo.hoa}',
            watersupply = '${newInfo.watersupply}',
            electricitysupply = '${newInfo.elecsupply}',
            sewerage = '${newInfo.sewerage}',
            ownername = '${newInfo.ownername}', 
            propstream = '${newInfo.propsstream}', 
            estimatedarv = '${newInfo.estimatedarv}', 
            gmapdate = '${newInfo.gmapsdate}', 
            gearthlink = '${newInfo.gearthlink}', 
            showingbuilding = '${newInfo.showingbuilding}', 
            buildingsize = '${newInfo.buildingsize}', 
            yearbuilt = '${newInfo.builtyear}', 
            structuretype = '${newInfo.structuretype}', 
            bedrooms = '${newInfo.bedroomsnumber}', 
            bathrooms = '${newInfo.bathroomsnumber}', 
            garage = '${newInfo.garagesize}', 
            taxesperyear = '${newInfo.taxesperyear}', 
            cadlandvalue = '${newInfo.cadlandvalue}', 
            cadbuildingvalue = '${newInfo.cadbuildingvalue}', 
            cadtotalvalue = '${newInfo.cadtotalvalue}', 
            needtoconfirm = '${newInfo.needtoconfirm}', 
            cadimage = '${newInfo.cadimage}',
            listtype = '${newInfo.listtype}'
    
	        WHERE parcelid = '${newInfo.parcelid}';
        `
        dbClient.query(editQuery, (err, result)=>{
            if(!err){
                console.log(newInfo.userinfo[0].username, 'Edit was successful. Parcel:', newInfo.parcelid)
                res.send({"message":"edit"})
            }
            else{ console.log(user, 'erro durante edit', newInfo.parcelid, err) }
        })
        dbClient.end
    }

    async searchTableByUser(user, date, page){
        const offset = page - 1
        const searchQuery = `
		SELECT parcelid, gisimg, gislink, floodzoneimg, floodzonetext, mapsimg, mapslink, streetviewimg, marketvalue, latitude, longitude, acres, adress, n1adress, n2adress, n3adress, n4adress, rank1, obs1, rank2, userrank2, obs2, rank3, userrank3, obs3, item_id, dateandtime, taxowned, county, state, username, buyopt, floodzonelink, zillowlink, zestimate, hoa, watersupply, electricitysupply, sewerage, ownername, propstream, estimatedarv, gmapdate, gearthlink, showingbuilding, buildingsize, yearbuilt, structuretype, bedrooms, bathrooms, garage, taxesperyear, cadlandvalue, cadbuildingvalue, cadtotalvalue, needtoconfirm, cadimage, listtype
	    FROM public."2021-data"
		WHERE "username" = '${user}' AND date = '${date}'
        OR "username2" = '${user}' AND date2 = '${date}'
        ORDER BY item_id DESC
        LIMIT 10 OFFSET (10 * ${offset});
	    `
        try {
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            return result
        }
        catch(err){console.log(err)
        }
    }

    async dailyCount(user, date){
        const searchQuery = `
        SELECT parcelid
        FROM public."2021-data"
        WHERE "username" = '${user}' AND date = '${date}'
        OR "username2" = '${user}' AND date2 = '${date}';
        `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            //console.log(result)
            return result.rows.length
        }
        catch(err){console.log(err)}
    }

    searchTableByRank(rank, date, ranktype, page, res){
        const offset = page - 1
        const searchQuery = `
		SELECT parcelid, gisimg, gislink, floodzoneimg, floodzonetext, mapsimg, mapslink, streetviewimg, marketvalue, latitude, longitude, acres, adress, n1adress, n2adress, n3adress, n4adress, rank1, obs1, rank2, userrank2, obs2, rank3, userrank3, obs3, item_id, dateandtime, taxowned, county, state, username, buyopt, floodzonelink, zillowlink, zestimate, hoa, watersupply, electricitysupply, sewerage, ownername, propstream, estimatedarv, gmapdate, gearthlink, showingbuilding, buildingsize, yearbuilt, structuretype, bedrooms, bathrooms, garage, taxesperyear, cadlandvalue, cadbuildingvalue, cadtotalvalue, needtoconfirm, cadimage, listtype
	    FROM public."2021-data"
		WHERE "${ranktype}" = '${rank}' AND date = '${date}'
        ORDER BY item_id DESC
        LIMIT 10 OFFSET (10 * ${offset});
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

    searchTableByRankResumed(rank, date, ranktype, page, res){
        const offset = page - 1
        const searchQuery = `
		SELECT parcelid, gislink, floodzonetext, mapslink, marketvalue, latitude, longitude, acres, adress, n1adress, n2adress, n3adress, n4adress, rank1, obs1, rank2, userrank2, obs2, rank3, userrank3, obs3, item_id, dateandtime, taxowned, county, state, username, buyopt, floodzonelink, zillowlink, zestimate, hoa, watersupply, electricitysupply, sewerage, ownername, propstream, estimatedarv, gmapdate, gearthlink, showingbuilding, buildingsize, yearbuilt, structuretype, bedrooms, bathrooms, garage, taxesperyear, cadlandvalue, cadbuildingvalue, cadtotalvalue, needtoconfirm, listtype
	    FROM public."2021-data"
		WHERE "${ranktype}" = '${rank}' AND date = '${date}'
        ORDER BY item_id DESC
        LIMIT 100 OFFSET (100 * ${offset});
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

    async rankCount(rank, date, ranktype){
        const searchQuery = `
		SELECT parcelid
	    FROM public."2021-data"
		WHERE "${ranktype}" = '${rank}' AND date = '${date}'
	    `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            //console.log(result)
            return result.rows.length
        }
        catch(err){console.log(err)}
        dbClient.end
    }

    async searchByCounty(county, page){
        const offset = page - 1
        const searchQuery = `
		SELECT parcelid, gisimg, gislink, floodzoneimg, floodzonetext, mapsimg, mapslink, streetviewimg, marketvalue, latitude, longitude, acres, adress, n1adress, n2adress, n3adress, n4adress, rank1, obs1, rank2, userrank2, obs2, rank3, userrank3, obs3, item_id, dateandtime, taxowned, county, state, username, buyopt, floodzonelink, zillowlink, zestimate, hoa, watersupply, electricitysupply, sewerage, ownername, propstream, estimatedarv, gmapdate, gearthlink, showingbuilding, buildingsize, yearbuilt, structuretype, bedrooms, bathrooms, garage, taxesperyear, cadlandvalue, cadbuildingvalue, cadtotalvalue, needtoconfirm, cadimage, listtype
	    FROM public."2021-data"
		WHERE "county" = '${county}'
        ORDER BY item_id DESC
        LIMIT 10 OFFSET (10 * ${offset});
	    `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            return result.rows
        }
        catch(err){console.log(err)}
        dbClient.end
    }

    async searchByCountyResumed(county, page){
        const offset = page - 1
        const searchQuery = `
		SELECT parcelid, gislink, floodzonetext, mapslink, marketvalue, latitude, longitude, acres, adress, n1adress, n2adress, n3adress, n4adress, rank1, obs1, rank2, userrank2, obs2, rank3, userrank3, obs3, item_id, dateandtime, taxowned, county, state, username, buyopt, floodzonelink, zillowlink, zestimate, hoa, watersupply, electricitysupply, sewerage electricitysupply, sewerage, ownername, propstream, estimatedarv, gmapdate, gearthlink, showingbuilding, buildingsize, yearbuilt, structuretype, bedrooms, bathrooms, garage, taxesperyear, cadlandvalue, cadbuildingvalue, cadtotalvalue, needtoconfirm, listtype
	    FROM public."2021-data"
		WHERE "county" = '${county}'
        ORDER BY item_id DESC
        LIMIT 100 OFFSET (100 * ${offset});
	    `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            return result.rows
        }
        catch(err){console.log(err)}
        dbClient.end
    }

    async countyCount(county){
        const searchQuery = `
		SELECT parcelid
	    FROM public."2021-data"
		WHERE "county" = '${county}'
	    `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            //console.log(result)
            return result.rows.length
        }
        catch(err){console.log(err)}
    }

    async searchByChecked(req){
        const offset = req.body.page - 1
        const searchQuery = `
		SELECT parcelid, gisimg, gislink, floodzoneimg, floodzonetext, mapsimg, mapslink, streetviewimg, marketvalue, latitude, longitude, acres, adress, n1adress, n2adress, n3adress, n4adress, rank1, obs1, rank2, userrank2, obs2, rank3, userrank3, obs3, item_id, dateandtime, taxowned, county, state, username, buyopt, floodzonelink, zillowlink, zestimate, hoa, watersupply, electricitysupply, sewerage, ownername, propstream, estimatedarv, gmapdate, gearthlink, showingbuilding, buildingsize, yearbuilt, structuretype, bedrooms, bathrooms, garage, taxesperyear, cadlandvalue, cadbuildingvalue, cadtotalvalue, needtoconfirm, cadimage, listtype
	    FROM public."2021-data"
		WHERE "buyopt" = 'yes' AND state = '${req.body.state}' AND county = '${req.body.county}'
        ORDER BY item_id DESC
        LIMIT 10 OFFSET (10 * ${offset});
	    `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            return result
        }
        catch(err){console.log(err)}
    }

    async checkedCount(req){
        const searchQuery = `
		SELECT parcelid
	    FROM public."2021-data"
		WHERE "buyopt" = 'yes' AND state = '${req.body.state}' AND county = '${req.body.county}'
	    `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            return result.rows.length
        }
        catch(err){console.log(err)}
    }

    async searchByType(listtype, date, page){
        const offset = page - 1
        const searchQuery = `
		SELECT parcelid, gisimg, gislink, floodzoneimg, floodzonetext, mapsimg, mapslink, streetviewimg, marketvalue, latitude, longitude, acres, adress, n1adress, n2adress, n3adress, n4adress, rank1, obs1, rank2, userrank2, obs2, rank3, userrank3, obs3, item_id, dateandtime, taxowned, county, state, username, buyopt, floodzonelink, zillowlink, zestimate, hoa, watersupply, electricitysupply, sewerage, ownername, propstream, estimatedarv, gmapdate, gearthlink, showingbuilding, buildingsize, yearbuilt, structuretype, bedrooms, bathrooms, garage, taxesperyear, cadlandvalue, cadbuildingvalue, cadtotalvalue, needtoconfirm, cadimage, listtype
	    FROM public."2021-data"
		WHERE "listtype" = '${listtype}' AND date = '${date}'
        ORDER BY item_id DESC
        LIMIT 10 OFFSET (10 * ${offset});
	    `
        try {
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            return result
        }
        catch(err){console.log(err)}
    }

    async typeCount(listtype, date){
        const searchQuery = `
		SELECT parcelid
	    FROM public."2021-data"
		WHERE "listtype" = '${listtype}' AND date = '${date}'
        ORDER BY item_id DESC
	    `
        try {
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            return result
        }
        catch(err){console.log(err)}
    }

    async searchByParcel(parcel, res){
        const searchQuery = `
		SELECT parcelid,
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
        rank2, 
        userrank2, 
        obs2, 
        rank3, 
        userrank3, 
        obs3, 
        item_id, 
        dateandtime, 
        taxowned, 
        user, 
        state, 
        county,
        username,
        buyopt,
        floodzonelink,
        zillowlink,
        zestimate,
        hoa,
        watersupply,
        electricitysupply,
        sewerage, ownername, propstream, estimatedarv, gmapdate, gearthlink, showingbuilding, buildingsize, yearbuilt, structuretype, bedrooms, bathrooms, garage, taxesperyear, cadlandvalue, cadbuildingvalue, cadtotalvalue, needtoconfirm, cadimage, listtype
	    FROM public."2021-data"
		WHERE "parcelid" = '${parcel}';
	    `
        try {
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            return result.rows[0]
        }
        catch(err){console.log(err)
        }
        dbClient.end
    }

    insertNewUser(req, res){
        var user = req.body	    
        let insertQuery = 
        `
        INSERT INTO public.userinfo(
            username, password, supervisor)
            VALUES ('${user.newusername}', '${user.newpassword}', '${user.supervisor}');
        `

        dbClient.query(insertQuery, (err, result)=>{
            if(!err){
                console.log('Insertion was successful')
                res.send(result.rows)
            }
            else{ console.log(err.message) }
        })
        dbClient.end;
    }

    async insertNewVA(user, password, supervisor){
        const insertQuery = `
            INSERT INTO public.userinfo(
                username, password, supervisor)
                VALUES ('${user}', '${password}', '${supervisor}');
        `
        try{
            await dbClient.query(insertQuery)
            console.log('Insertion was successful')
        }
        catch(err){
            console.log(err)
        }
    }

    async insertNewManager(user, password){
        const insertQuery = `
            INSERT INTO public.managerinfo(
            username, password)
            VALUES ('${user}', '${password}');
        `
        try{
            await dbClient.query(insertQuery)
            console.log('Insertion was successful')
        }
        catch(err){
            console.log(err)
        }
    }

    async getUsers(req, res){
        const sql = 'select * from public.userinfo'
            try{
                const result = await dbClient.query(sql)
                console.log('Insertion was successful')
                dbClient.end;
                res.send(result.rows)
            }
            catch(err){
                console.log(err)
            }  
    }

    async getUsersManager(req, res){
        const sql = 'select * from public.managerinfo'
        try{
            const result = await dbClient.query(sql)
            console.log('Insertion was successful')
            dbClient.end;
            res.send(result.rows)
        }
        catch(err){
            console.log(err)
        }
    }
    
    async deleteVa(user){
        const deleteQuery = `
            DELETE FROM public.userinfo
            WHERE username = '${user}';`
            try{
                await dbClient.query(deleteQuery)
                console.log('Va was deleted successfuly')
                dbClient.end;
            }
            catch(err){
                console.log(err)
            }
    }

    async deleteManager(user){
        const deleteQuery = `
            DELETE FROM public.managerinfo
            WHERE username = '${user}';`
            try{
                await dbClient.query(deleteQuery)
                console.log('Manager was deleted successfuly')
                dbClient.end;
            }
            catch(err){
                console.log(err)
            }
    }

    
    
    async selectUser(req, res){
        var user = req.body	    
        let insertQuery = `
		SELECT username, password
	    FROM public.userinfo
	    WHERE username = '${user.user}';
        `
        try {
            const result = await dbClient.query(insertQuery)
            dbClient.end;
            return result.rows[0]
        }
        catch(err){console.log(err)
        }
    }

    async selectManager(req, res){
        var user = req.body	    
        let insertQuery = `
		SELECT username, password
	    FROM public.managerinfo
	    WHERE username = '${user.user}';
        `
        try {
            const result = await dbClient.query(insertQuery)
            dbClient.end;
            return result.rows[0]
        }
        catch(err){console.log(err)}
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
            console.log("rank2 updated on DB")
            }
            else{console.log(err.message)}
        })
    }

    editRank3(req, res){
        var rank3 = req.body
        let insertQuery = `
            UPDATE public."2021-data"
            SET rank3='${rank3.rank3}', userrank3='${rank3.userrank3}', obs3='${rank3.obs3}', buyopt='${rank3.buyopt}'
            WHERE parcelid='${rank3.parcelid}';  
        `
        dbClient.query(insertQuery, (err, result)=>{
            if(!err){
            console.log("rank3 updated on DB")
            res.send()
            }
            else{console.log(err.message)}
        })
    }

    async add2Log(user, usertype, logtype){   
        let insertQuery = `
        INSERT INTO public.userlogs(
            username, usertype, logtype)
            VALUES ('${user}', '${usertype}', '${logtype}');
        `
        dbClient.query(insertQuery, (err, result)=>{
            if(!err){
                console.log(user, 'log added', logtype)
            }
            else{ console.log(err.message) }
        })
        dbClient.end;
    }

    searchLogs(user, req, res){
        const searchQuery = `
        SELECT username, usertype, logtype, "timestamp", log_id
        FROM public.userlogs
        WHERE "username" = '${user}'
        ORDER BY log_id DESC;
	    `
        dbClient.query(searchQuery, (error, result) => {
            if(error){
                console.log(error)
            }
            else{   
	            res.send(result.rows)
                console.log('usuarios buscados')  
            }
        })
        dbClient.end
    }

    allUsers(res){
        const searchQuery = `
            SELECT username, password, supervisor, creationdate
            FROM public.userinfo;  
	    `
        dbClient.query(searchQuery, (error, result) => {
            if(error){
                console.log(error)
            }
            else{		    
	            res.send(result.rows)
                console.log('todos os usuarios buscados')  
            }
        })
        dbClient.end
    }

    async dailySearch(user, date){
        const searchQuery = `
        SELECT parcelid, rank1, rank2, rank3, dateandtime, username, username2, date, date2
        FROM public."2021-data"
        WHERE "username" = '${user}' AND date = '${date}'
        OR "username2" = '${user}' AND date2 = '${date}';
        `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            //console.log(result)
            return result
        }
        catch(err){console.log(err)}
    };

    async resumedSearch(user, month){
        const searchQuery = `
        SELECT parcelid, rank1, rank2, rank3, dateandtime, username, username2, date, date2
        FROM public."2021-data"
        WHERE EXTRACT(MONTH FROM date) = '${month}' AND username= '${user}'
        OR EXTRACT(MONTH FROM date) = '${month}' AND username2= '${user}';
        `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            //console.log(result)
            return result
        }
        catch(err){console.log(err)}
    }

    async getCalendar(date){
        const searchQuery =`
        SELECT parcelid, state, county, date
        FROM public."2021-data"
        WHERE date = '${date}'
        ORDER BY date ASC;
        `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            //console.log(result)
            return result
        }
        catch(err){console.log(err)}
    }

    async addTemplate(templateName, template, envelopeInfo){
        const insertQuery = `
        INSERT INTO public.templates(
            templatename, template, envelopeinfo)
            VALUES ('${templateName}', '${template}', '${envelopeInfo}');
        `
        try{
            await dbClient.query(insertQuery)
            dbClient.end;
            console.log('successful template insertion')
        }
        catch(err){
            console.log(error)
        }
    }

    async getTemplates(){
        const searchQuery =`
            SELECT * FROM public.templates
            ORDER BY id ASC 
        `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            //console.log(result)
            return result
        }
        catch(err){console.log(err)}
    }

    async deleteTemplate(templateName){
        const insertQuery = `
        DELETE FROM public.templates
        WHERE templatename = '${templateName}';
        `
        try{
            await dbClient.query(insertQuery)
            dbClient.end;
            console.log('successful template delete')
        }
        catch(err){
            console.log(error)
        }
    }

    
}

module.exports = new pgProgram
