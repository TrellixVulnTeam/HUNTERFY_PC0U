function editarCard(card){
    var cardInfo = card.children[0]
    
     //--array name   --input inside info              --input empty info                                               --input html name"                    
    var parcelid = [cardInfo.children[0].children[1], `<label>PARCEL ID:</label><input name="parcelid" type="text">`, "parcelid"]
    var obs = [cardInfo.children[5].children[1], `<label>OBS:</label><input name="obs" type="text">`, `obs`]
    var floodzonetext = [cardInfo.children[6].children[1], `<label>FLOODZONE:</label><input name="floodzone" type="text">`, `floodzone`]
    var taxowned = [cardInfo.children[7].children[1],`<label>TAX OWNED:</label><input name="taxowned" type="text">`, `taxowned`]
    var marketvalue = [cardInfo.children[8].children[1],`<label>MARKET VALUE:</label><input name="marketvalue" type="text">`, `marketvalue`]
    var linkgis = [cardInfo.children[9].children[1],`<label>LINK GIS:</label><input name="linkgis" type="text">`, `linkgis`]
    var latitude = [cardInfo.children[10].children[1],`<label>LATITUDE:</label><input name="latitude" type="text">`, `latitude`]
    var longitude = [cardInfo.children[11].children[1],`<label>LONGITUDE:</label><input name="longitude" type="text">`, `longitude`]
    var adress = [cardInfo.children[12].children[1],`<label>ADRESS:</label><input name="end" type="text">`, `end`]
     //--array name     --input inside info              --label            --class             --cache id
    var sateliteimage = [cardInfo.children[1].children[1], `SATELITE IMAGE`, 'imagem-satelite', 'cachesateliteimg']
    var floodzoneimage = [cardInfo.children[2].children[1], `FLOODZONE IMAGE`, 'imagem-floodzone', 'cachefloodzoneimg']
    var mapsimage = [cardInfo.children[3].children[1], `MAPS IMAGE`, 'imagem-maps', 'cachemapsimg']
    var streetviewimage = [cardInfo.children[4].children[1], `STREETVIEW IMAGE`, 'imagem-streetview', 'cachestreetviewimg']

    //cria uma area de edição preenchida
    var editAreaHtml = `
        <div class="card-edit">
        <button class="fechar-card" onclick="fecharCardEdit()"><i class="fas fa-times-circle"></i></button>
        <form action="" method="POST">
            <div class="campo1">
                <div>${checkValueText(parcelid)}</div>
                <div>${checkValueImg(sateliteimage)}</div>
                <div>${checkValueImg(floodzoneimage)}</div>
                <div>${checkValueImg(mapsimage)}</div>
                <div>${checkValueImg(streetviewimage)}</div>
                <div>${checkValueText(taxowned)}</div>
                
                
            </div>
            <div class="campo2">
                <div>${checkValueText(obs)}</div>
                <div>${checkValueText(floodzonetext)}</div>
                <div>${checkValueText(marketvalue)}</div>
                <div>${checkValueText(linkgis)}</div>
                <div>${checkValueText(latitude)}</div>
                <div>${checkValueText(longitude)}</div>
                
            </div>
            <div class="campo3">
                <div>${checkValueText(adress)}</div>
                <div><label>ADRESS V1:</label><input type="text"></div>
                <div><label>ADRESS V2:</label><input type="text"></div>
                <div><label>ADRESS V3:</label><input type="text"></div>
                <div><label>ADRESS V4:</label><input type="text"></div>
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
        attContador()
    })
}