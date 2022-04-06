function editarCard(card){
    const cardInfo = card.children[1]
     //--array name   --input inside info              --input empty info                                       --input html name"--label title                    
    const parcelid = [cardInfo.children[0].children[1], `<label>PARCEL ID:</label><input name="parcelid" type="text">`, "parcelid", `PARCEL ID:`]
    const linkgis = [cardInfo.children[2].children[1],`<label>LINK GIS:</label><input name="linkgis" type="text">`, `linkgis`, `LINK GIS:`]
    const floodzonetext = [cardInfo.children[4].children[1], `<label>FLOODZONE:</label><input name="floodzone" type="text">`, `floodzone`, `FLOODZONE:`]
    const mapslink = [cardInfo.children[6].children[1], `<label>MAPS LINK:</label><input name="mapslink" type="text">`, `mapslink`, `MAPS LINK:` ]
    const taxowned = [cardInfo.children[8].children[1],`<label>TAX VALUE:</label><input name="taxowned" type="text">`, `taxowned`, `TAX VALUE:`]
    const marketvalue = [cardInfo.children[9].children[1],`<label>LAND VALUE:</label><input name="marketvalue" type="text">`, `marketvalue`, `LAND VALUE:`]
    const latitude = [cardInfo.children[10].children[1],`<label>LATITUDE:</label><input name="latitude" type="text">`, `latitude`, `LATITUDE:`]
    const longitude = [cardInfo.children[11].children[1],`<label>LONGITUDE:</label><input name="longitude" type="text">`, `longitude`, `LONGITUDE:`]
    const acres = [cardInfo.children[12].children[1], `<label>LOT SIZE:</label><input name="acres" type="text">`, `acres`, `LOT SIZE:`]
    const adress = [cardInfo.children[13].children[1],`<label>ADDRESS:</label><input name="end" type="text">`, `end`, `ADDRESS`]
    const adressn1 = [cardInfo.children[14].children[1],`<label>ADDRESS NEIGHBOOR 1:</label><input name="end1" type="text">`, `end1`, `NEIGHBOOR 1 ADDRESS:`]
    const adressn2 = [cardInfo.children[15].children[1],`<label>ADDRESS NEIGHBOOR 2:</label><input name="end2" type="text">`, `end2`, `NEIGHBOOR 2 ADDRESS:`]
    const adressn3 = [cardInfo.children[16].children[1],`<label>ADDRESS NEIGHBOOR 3:</label><input name="end3" type="text">`, `end3`, `NEIGHBOOR 3 ADDRESS:`]
    const adressn4 = [cardInfo.children[17].children[1],`<label>ADDRESS NEIGHBOOR 4:</label><input name="end4" type="text">`, `end4`, `NEIGHBOOR 4 ADDRESS:`]
    const rank = cardInfo.children[18].children[1]
    const obs = [cardInfo.children[19].children[1], `<label>OBS:</label><input name="obs" type="text">`, `obs`, `OBS:`]
    const floodzonelink = [cardInfo.children[20].children[1], `<label>FLOODZONE LINK:</label><input name="floodzonelink" type="text">`, `floodzonelink`, `FLOODZONE LINK:`]
    const zestimate = [cardInfo.children[21].children[1], `<label>ZESTIMATE:</label><input name="zestimate" type="text">`, `zestimate`, `ZESTIMATE:`]
    const zillow = [cardInfo.children[22].children[1], `<label>ZILLOW/REALTOR LINK:</label><input name="zillow" type="text">`, `zillow`, `ZILLOW/REALTOR LINK:`]
    const hoa = [cardInfo.children[23].children[1], `<label>HOA:</label><input name="hoa" type="text">`, `hoa`, `HOA:`]
    const watersupply = [cardInfo.children[24].children[1], 'WATER SUPPLY:', 'watersupply']
    const elecsupply = [cardInfo.children[25].children[1], 'ELECTRICITY SUPPLY:', 'elecsupply']
    const sewerage = [cardInfo.children[26].children[1], 'SEWERAGE:', 'sewerage']
    const minimal = [cardInfo.children[27].children[1], `<label>MINIMAL BID:</label><input name="minimalbid" type="text">`, "minimalbid", `MINIMAL BID:`]
    const n1name = [cardInfo.children[28].children[1], `<label>NEIGHBOOR 1 NAME:</label><input name="n1name" type="text">`, "n1name", `NEIGHBOOR 1 NAME:`]
    const n2name = [cardInfo.children[29].children[1], `<label>NEIGHBOOR 2 NAME:</label><input name="n2name" type="text">`, "n2name", `NEIGHBOOR 2 NAME:`]
    const n3name = [cardInfo.children[30].children[1], `<label>NEIGHBOOR 3 NAME:</label><input name="n3name" type="text">`, "n3name", `NEIGHBOOR 3 NAME:`]
    const n4name = [cardInfo.children[31].children[1], `<label>NEIGHBOOR 4 NAME:</label><input name="n4name" type="text">`, "n4name", `NEIGHBOOR 4 NAME:`]
     //--array name     --input inside info              --label            --class             --cache id
    const sateliteimage = [cardInfo.children[1].children[1], `SATELITE IMAGE`, 'imagem-satelite', 'cachesateliteimg']
    const floodzoneimage = [cardInfo.children[3].children[1], `FLOODZONE IMAGE`, 'imagem-floodzone', 'cachefloodzoneimg']
    const mapsimage = [cardInfo.children[5].children[1], `MAPS IMAGE`, 'imagem-maps', 'cachemapsimg']
    const streetviewimage = [cardInfo.children[7].children[1], `STREETVIEW IMAGE`, 'imagem-streetview', 'cachestreetviewimg']
    

    //cria uma area de edição preenchida
    var editAreaHtml = `
        <div class="card-edit">
        <button class="fechar-card" onclick="fecharCardEdit()"><i class="fas fa-times-circle"></i></button>
        <form>
            <div class="campo1">
                <div>${checkValueText(parcelid)}</div>
                <div>${checkValueImg(sateliteimage)}</div>
                <div>${checkValueImg(floodzoneimage)}</div>
                <div>${checkValueImg(mapsimage)}</div>
                <div>${checkValueImg(streetviewimage)}</div>
                <div>${checkValueText(taxowned)}</div>
                <div>${checkValueText(marketvalue)}</div>
            </div>
            <div class="campo2">
                <div>${checkValueText(acres)}</div>
                <div>${checkValueText(linkgis)}</div>
                <div>${checkValueText(floodzonetext)}</div>
                <div>${checkValueText(mapslink)}</div>
                <div>${checkValueText(latitude)}</div>
                <div>${checkValueText(longitude)}</div>
                <div>${checkValueText(adress)}</div>
            </div>
            <div class="campo3">
                <div>${checkValueText(zestimate)}</div>
                <div>${checkValueText(zillow)}</div>
                <div>${checkValueText(floodzonelink)}</div>
                <div>${checkValueText(n1name)}</div>
                <div>${checkValueText(n2name)}</div>
                <div>${checkValueText(n3name)}</div>
                <div>${checkValueText(n4name)}</div>
                
            </div>
            <div class="campo4">
                <div>${checkOpt(watersupply)}</div>
                <div>${checkOpt(elecsupply)}</div>
                <div>${checkOpt(sewerage)}</div>
                <div>${checkValueText(adressn1)}</div>
                <div>${checkValueText(adressn2)}</div>
                <div>${checkValueText(adressn3)}</div>
                <div>${checkValueText(adressn4)}</div>
                
            </div>
            <div class="campo5">
                <div>${checkValueText(hoa)}</div>
                <div>${checkRank(rank)}</div>
                <div>${checkValueText(obs)}</div>
                <div>${checkValueText(minimal)}</div>
                <div><button class="save-edit">SAVE</button></div>
            </div>
        </form>
    </div>`
    rootEditArea.innerHTML = editAreaHtml
    
    var saveButton = document.querySelector(".save-edit")
    saveButton.addEventListener("click", (event)=>{
        event.preventDefault()
        const form = document.querySelector('form')
        parcelid[0].innerHTML = form.parcelid.value
        linkgis[0].innerHTML = form.linkgis.value
        floodzonetext[0].innerHTML = form.floodzone.value
        mapslink[0].innerHTML = form.mapslink.value
        taxowned[0].innerHTML = form.taxowned.value
        marketvalue[0].innerHTML = form.marketvalue.value
        latitude[0].innerHTML = form.latitude.value
        longitude[0].innerHTML = form.longitude.value
        acres[0].innerHTML = form.acres.value
        adress[0].innerHTML = form.end.value
        adressn1[0].innerHTML = form.end1.value
        adressn2[0].innerHTML = form.end2.value
        adressn3[0].innerHTML = form.end3.value
        adressn4[0].innerHTML = form.end4.value
        rank.innerHTML = form.rank.value
        obs[0].innerHTML = form.obs.value
        floodzonelink[0].innerHTML = form.floodzonelink.value
        zestimate[0].innerHTML = form.zestimate.value
        zillow[0].innerHTML = form.zillow.value
        hoa[0].innerHTML = form.hoa.value
        watersupply[0].innerHTML = form.watersupply.value
        elecsupply[0].innerHTML = form.elecsupply.value
        sewerage[0].innerHTML = form.sewerage.value
        minimal[0].innerHTML = form.minimalbid.value
        n1name[0].innerHTML = form.n1name.value
        n2name[0].innerHTML = form.n2name.value
        n3name[0].innerHTML = form.n3name.value
        n4name[0].innerHTML = form.n4name.value

        var floodzoneImg = document.querySelectorAll("#imagem-floodzone")[0]
        var mapsImg = document.querySelectorAll("#imagem-maps")[0]
        var streetviewImg = document.querySelectorAll("#imagem-streetview")[0]
        var sateliteImg = document.querySelectorAll("#imagem-satelite")[0]

        sateliteimage[0].src = checkFile(sateliteImg) 
        floodzoneimage[0].src = checkFile(floodzoneImg)
        mapsimage[0].src = checkFile(mapsImg)
        streetviewimage[0].src = checkFile(streetviewImg)
        fecharCardEdit()
    })
}

function editarHouse(card){
    const houseInfo = card.children[2].children[1]
    //--array name   --input inside info              --input empty info                                         --input html name"   --label title
    const ownerName = [houseInfo.children[0].children[1], `<label>OWNER NAME:</label><input name="ownername" type="text">`, "ownername", `OWNER NAME:`]
    const propsStream = [houseInfo.children[1].children[1], `<label>PROPSTREAM MARKET VAL:</label><input name="propstream" type="text">`, "propstream", `PROPSTREAM MARKET VALUE:`]
    const estimatedArv = [houseInfo.children[2].children[1], `<label>ESTIMATED ARV:</label><input name="estimatedarv" type="text">`, "estimatedarv", `ESTIMATED ARV:`]
    const gMapsDate = [houseInfo.children[3].children[1], `<label>GOOGLE MAPS DATE:</label><input name="gmapsdate" type="text">`, "gmapsdate", `GOOGLE MAPS DATE:`]
    const gEarthLink = [houseInfo.children[4].children[1], `<label>GOOGLE EARTH LINK:</label><input name="gearthlink" type="text">`, "gearthlink", `GOOGLE EARTH LINK:`]
    const showingBuilding = [houseInfo.children[5].children[1], `<label>SHOWING BUILDING:</label><input name="showingbuilding" type="text">`, "showingbuilding", `SHOWING BUILDING:`]
    const buildingSize = [houseInfo.children[6].children[1], `<label>BUILDING SIZE:</label><input name="buildingsize" type="text">`, "buildingsize", `BUILDING SIZE:`]
    const builtYear = [houseInfo.children[7].children[1], `<label>YEAR BUILT:</label><input name="yearbuilt" type="text">`, "yearbuilt", `YEAR BUILT:`]
    const structureType = [houseInfo.children[8].children[1], `<label>STRUCTURE TYPE:</label><input name="structuretype" type="text">`, "structuretype", `STRUCTURE TYPE:`]
    const bedroomsNumber = [houseInfo.children[9].children[1], `<label>NUMBER OF BEDROOMS:</label><input name="numberofbedrooms" type="text">`, "numberofbedrooms", `NUMBER OF BEDROOMS:`]
    const bathroomsNumber = [houseInfo.children[10].children[1], `<label>NUMBER OF BATHROOMS:</label><input name="numberofbathrooms" type="text">`, "numberofbathrooms", `NUMBER OF BATHROOMS:`]
    const garageSize = [houseInfo.children[11].children[1], `<label>GARAGE SIZE:</label><input name="garagesize" type="text">`, "garagesize", `GARAGE SIZE:`]
    const taxesPerYear = [houseInfo.children[12].children[1], `<label>TAXES PER YEAR:</label><input name="taxesperyear" type="text">`, "taxesperyear", `TAXES PER YEAR:`]
    const cadLandValue = [houseInfo.children[13].children[1], `<label>CAD LAND VALUE:</label><input name="cadlandvalue" type="text">`, "cadlandvalue", `CAD LAND VALUE:`]
    const cadBuildingValue = [houseInfo.children[14].children[1], `<label>CAD BUILDING VALUE:</label><input name="cadbuildingvalue" type="text">`, "cadbuildingvalue", `CAD BUILDING VALUE:`]
    const cadTotalValue = [houseInfo.children[15].children[1], `<label>CAD TOTAL VALUE:</label><input name="cadtotalvalue" type="text">`, "cadtotalvalue", `CAD TOTAL VALUE:`]
    const needToConfirm = [houseInfo.children[16].children[1], `<label>NEED TO CONFIRM CONDITION:</label><input name="needtoconfirm" type="text">`, "needtoconfirm", `NEED TO CONFIRM CONDITION:`]

    //--array name     --input inside info              --label            --class             --cache id
    const cadImage = [houseInfo.children[17].children[1], `CAD IMAGE:`, 'cad-image', 'cachecadimg']

    var houseEditAreaHtml = `
        <div class="card-edit">
        <button class="fechar-card" onclick="fecharCardEdit()"><i class="fas fa-times-circle"></i></button>
        <form>
            <div class="campo1">
                <div>${checkValueText(ownerName)}</div>
                <div>${checkValueText(bedroomsNumber)}</div>
                <div>${checkValueText(builtYear)}</div>
                <div>${checkValueText(gEarthLink)}</div>
                <div>${checkValueText(propsStream)}</div>
                <div></div>
                
            </div>
            <div class="campo2">
                <div>${checkValueImg(cadImage)}</div>
                <div>${checkValueText(bathroomsNumber)}</div>
                <div>${checkValueText(garageSize)}</div>
                <div>${checkValueText(showingBuilding)}</div>
                <div>${checkValueText(structureType)}</div>
                <div></div>
            </div>
            <div class="campo3">
                <div>${checkValueText(buildingSize)}</div> 
                <div>${checkValueText(taxesPerYear)}</div>
                <div>${checkValueText(cadLandValue)}</div>
                <div>${checkValueText(cadBuildingValue)}</div>
                <div>${checkValueText(cadTotalValue)}</div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="campo4">
                <div>${checkValueText(needToConfirm)}</div>
                <div>${checkValueText(estimatedArv)}</div>
                <div>${checkValueText(gMapsDate)}</div>
                <div><button class="save-house-edit">SAVE</button></div>
                <div></div>
                <div></div>
            </div>
        </form>
    </div>`
    rootEditArea.innerHTML = houseEditAreaHtml


    var saveHouseButton = document.querySelector(".save-house-edit")
    saveHouseButton.addEventListener("click", (event)=>{
        event.preventDefault()

        const housesForm = document.querySelector('form')
        ownerName[0].innerHTML = housesForm.ownername.value
        propsStream[0].innerHTML = housesForm.propstream.value
        estimatedArv[0].innerHTML = housesForm.estimatedarv.value
        gMapsDate[0].innerHTML = housesForm.gmapsdate.value
        gEarthLink[0].innerHTML = housesForm.gearthlink.value
        showingBuilding[0].innerHTML = housesForm.showingbuilding.value
        buildingSize[0].innerHTML = housesForm.buildingsize.value
        builtYear[0].innerHTML = housesForm.yearbuilt.value
        structureType[0].innerHTML = housesForm.structuretype.value
        bedroomsNumber[0].innerHTML = housesForm.numberofbedrooms.value
        bathroomsNumber[0].innerHTML = housesForm.numberofbathrooms.value
        garageSize[0].innerHTML = housesForm.garagesize.value
        taxesPerYear[0].innerHTML = housesForm.taxesperyear.value
        cadLandValue[0].innerHTML = housesForm.cadlandvalue.value
        cadBuildingValue[0].innerHTML = housesForm.cadbuildingvalue.value
        cadTotalValue[0].innerHTML = housesForm.cadtotalvalue.value
        needToConfirm[0].innerHTML = housesForm.needtoconfirm.value
        
        var cadImg = document.querySelectorAll("#cad-image")[0]
        cadImage[0].src = checkFile(cadImg) 

        fecharCardEdit()
    })
}

function editarNeighboorInfo(card){
    const info = card.children[3].children[1]
    
    //--array name   --input inside info              --input empty info                                         --input html name"   --label title
    const n1email = [info.children[0].children[1], `<label>NEIGHBOOR 1 EMAIL:</label><input name="n1email" type="text">`, "n1email", `NEIGHBOOR 1 EMAIL:`]
    const n1number = [info.children[1].children[1], `<label>NEIGHBOOR 1 NUMBER:</label><input name="n1number" type="text">`, "n1number", `NEIGHBOOR 1 NUMBER:`]
    const n2email = [info.children[2].children[1], `<label>NEIGHBOOR 2 EMAIL:</label><input name="n2email" type="text">`, "n2email", `NEIGHBOOR 2 EMAIL:`]
    const n2number = [info.children[3].children[1], `<label>NEIGHBOOR 2 NUMBER:</label><input name="n2number" type="text">`, "n2number", `NEIGHBOOR 2 NUMBER:`]
    const n3email = [info.children[4].children[1], `<label>NEIGHBOOR 3 EMAIL:</label><input name="n3email" type="text">`, "n3email", `NEIGHBOOR 3 EMAIL:`]
    const n3number = [info.children[5].children[1], `<label>NEIGHBOOR 3 NUMBER:</label><input name="n3number" type="text">`, "n3number", `NEIGHBOOR 3 NUMBER:`]
    const n4email = [info.children[6].children[1], `<label>NEIGHBOOR 4 EMAIL:</label><input name="n4email" type="text">`, "n4email", `NEIGHBOOR 4 EMAIL:`]
    const n4number = [info.children[7].children[1], `<label>NEIGHBOOR 4 NUMBER:</label><input name="n4number" type="text">`, "n4number", `NEIGHBOOR 4 NUMBER:`]
    
    

    var houseEditAreaHtml = `
        <div class="card-edit">
        <button class="fechar-card" onclick="fecharCardEdit()"><i class="fas fa-times-circle"></i></button>
        <form>
            <div class="campo1">
                <div>${checkValueText(n1email)}</div>
                <div>${checkValueText(n1number)}</div>
                <div>${checkValueText(n2email)}</div>
                <div>${checkValueText(n2number)}</div>
                <div>${checkValueText(n3email)}</div>
                <div>${checkValueText(n3number)}</div>
                
            </div>
            <div class="campo2">
                <div>${checkValueText(n4email)}</div>
                <div>${checkValueText(n4number)}</div>
                <div><button class="save-house-edit">SAVE</button></div>
                
                <div></div>
            </div>
            <div class="campo3">
                
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="campo4">
                
                
                <div></div>
                <div></div>
            </div>
        </form>
    </div>`
    rootEditArea.innerHTML = houseEditAreaHtml


    var saveHouseButton = document.querySelector(".save-house-edit")
    saveHouseButton.addEventListener("click", (event)=>{
        event.preventDefault()

        const form = document.querySelector('form')
        n1email[0].innerHTML = form.n1email.value
        n2email[0].innerHTML = form.n2email.value
        n3email[0].innerHTML = form.n3email.value
        n4email[0].innerHTML = form.n4email.value

        n1number[0].innerHTML = form.n1number.value
        n2number[0].innerHTML = form.n2number.value
        n3number[0].innerHTML = form.n3number.value
        n4number[0].innerHTML = form.n4number.value

        fecharCardEdit()
    })
}