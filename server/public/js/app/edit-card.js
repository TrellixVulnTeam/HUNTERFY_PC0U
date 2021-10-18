function editarCard(card){
    var cardInfo = card.children[1]
     //--array name   --input inside info              --input empty info                                       --input html name"--label title                    
    var parcelid = [cardInfo.children[0].children[1], `<label>PARCEL ID:</label><input name="parcelid" type="text">`, "parcelid", `PARCEL ID:`]
    var linkgis = [cardInfo.children[2].children[1],`<label>LINK GIS:</label><input name="linkgis" type="text">`, `linkgis`, `LINK GIS:`]
    var floodzonetext = [cardInfo.children[4].children[1], `<label>FLOODZONE:</label><input name="floodzone" type="text">`, `floodzone`, `FLOODZONE:`]
    var mapslink = [cardInfo.children[6].children[1], `<label>MAPS LINK:</label><input name="mapslink" type="text">`, `mapslink`, `MAPS LINK:` ]
    var taxowned = [cardInfo.children[8].children[1],`<label>TAX VALUE:</label><input name="taxowned" type="text">`, `taxowned`, `TAX VALUE:`]
    var marketvalue = [cardInfo.children[9].children[1],`<label>PROPERTY VALUE:</label><input name="marketvalue" type="text">`, `marketvalue`, `PROPERTY VALUE:`]
    var latitude = [cardInfo.children[10].children[1],`<label>LATITUDE:</label><input name="latitude" type="text">`, `latitude`, `LATITUDE:`]
    var longitude = [cardInfo.children[11].children[1],`<label>LONGITUDE:</label><input name="longitude" type="text">`, `longitude`, `LONGITUDE:`]
    var acres = [cardInfo.children[12].children[1], `<label>ACRES:</label><input name="acres" type="text">`, `acres`, `ACRES:`]
    var adress = [cardInfo.children[13].children[1],`<label>ADRESS:</label><input name="end" type="text">`, `end`, `ADRESS`]
    var adressn1 = [cardInfo.children[14].children[1],`<label>ADRESS NEIGHBOOR 1:</label><input name="end1" type="text">`, `end1`, `NEIGHBOOR 1 ADRESS:`]
    var adressn2 = [cardInfo.children[15].children[1],`<label>ADRESS NEIGHBOOR 2:</label><input name="end2" type="text">`, `end2`, `NEIGHBOOR 2 ADRESS:`]
    var adressn3 = [cardInfo.children[16].children[1],`<label>ADRESS NEIGHBOOR 3:</label><input name="end3" type="text">`, `end3`, `NEIGHBOOR 3 ADRESS:`]
    var adressn4 = [cardInfo.children[17].children[1],`<label>ADRESS NEIGHBOOR 4:</label><input name="end4" type="text">`, `end4`, `NEIGHBOOR 4 ADRESS:`]
    var rank = cardInfo.children[18].children[1]
    var obs = [cardInfo.children[19].children[1], `<label>OBS:</label><input name="obs" type="text">`, `obs`, `OBS:`]
    var floodzonelink = [cardInfo.children[20].children[1], `<label>FLOODZONE LINK:</label><input name="floodzonelink" type="text">`, `floodzonelink`, `FLOODZONE LINK:`]
    var zestimate = [cardInfo.children[21].children[1], `<label>ZESTIMATE:</label><input name="zestimate" type="text">`, `zestimate`, `ZESTIMATE:`]
    var zillow = [cardInfo.children[22].children[1], `<label>ZILLOW LINK:</label><input name="zillow" type="text">`, `zillow`, `ZILLOW LINK:`]
    var hoa = [cardInfo.children[23].children[1], `<label>HOA:</label><input name="hoa" type="text">`, `hoa`, `HOA:`]
    var watersupply = [cardInfo.children[24].children[1], 'WATER SUPPLY:', 'watersupply']
    var elecsupply = [cardInfo.children[25].children[1], 'ELECTRICITY SUPPLY:', 'elecsupply']
    var sewerage = [cardInfo.children[26].children[1], 'SEWERAGE:', 'sewerage']
     //--array name     --input inside info              --label            --class             --cache id
    var sateliteimage = [cardInfo.children[1].children[1], `SATELITE IMAGE`, 'imagem-satelite', 'cachesateliteimg']
    var floodzoneimage = [cardInfo.children[3].children[1], `FLOODZONE IMAGE`, 'imagem-floodzone', 'cachefloodzoneimg']
    var mapsimage = [cardInfo.children[5].children[1], `MAPS IMAGE`, 'imagem-maps', 'cachemapsimg']
    var streetviewimage = [cardInfo.children[7].children[1], `STREETVIEW IMAGE`, 'imagem-streetview', 'cachestreetviewimg']

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
                <div>${checkValueText(adressn1)}</div>
                <div>${checkValueText(adressn2)}</div>
                <div>${checkValueText(adressn3)}</div>
                <div>${checkValueText(adressn4)}</div>
                
            </div>
            <div class="campo4">
                <div>${checkValueText(hoa)}</div>
                <div>${checkOpt(watersupply)}</div>
                <div>${checkOpt(elecsupply)}</div>
                <div>${checkOpt(sewerage)}</div>
                <div>${checkRank(rank)}</div>
                <div>${checkValueText(obs)}</div>
                <div><button class="save-edit">SALVAR</button></div>
            </div>
        </form>
    </div>`
    rootEditArea.innerHTML = editAreaHtml
    //destrói card atual para reconstruir atualizado
    var saveButton = document.querySelector(".save-edit")
    saveButton.addEventListener("click", (event)=>{
        event.preventDefault()
        criarCard()
        excluirCard(card)
        fecharCardEdit()
    })
}