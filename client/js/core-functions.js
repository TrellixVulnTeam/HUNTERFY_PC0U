function attContador(){
    var contador = document.querySelector(".contador")
    var contagem = document.querySelectorAll('.card')
    if(contagem.length >0){
        for (var i = 0; i < contagem.length; i++){
            contador.innerHTML = contagem.length
        }
    }else{}
}

function checkValue(element){
    if(element.length > 0){
        return element
    }else{
        element = " "
        return element
    }
}

function checkFile(element, elementid){
    if (element.files.length === 0) {
        var imgcache = document.querySelector(`#${elementid}`)
        if (imgcache === null) {
            console.log("ok")
        }
        else{return imgcache.src}
        
        //alert(`falta selecionar arquivo: ${elementid}`)
    }
    else{
        return "./imgdatabase/" + element.files[0].name
    }
    try {} catch (error) {}
}

function fecharCardEdit(){
    rootEditArea.innerHTML = ''
}

var botaoInfo = document.querySelector(".info-button")
botaoInfo.addEventListener("click", ()=>{
    var areaInfo = document.querySelector(".menu-info")
    if(areaInfo.style.display == "flex"){
        areaInfo.style.display = "none"
    }else{
        areaInfo.style.display = "flex"
    }
})

function checkValueText(element){
    if (element[0].innerHTML.length < 2) {
        return element[1]
    }else{
        return `<label>${element[3]}</label><input value="${element[0].innerHTML}" name="${element[2]}" type="text">`
    }
}

function checkValueImg(element){
    console.log(element[0].src.length)
    if (element[0].src.length === 29) {
       return `<img src='' id="${element[3]}" style='display:none;'><label>${element[1]}</label><label class="up-icon" for="${element[2]}"><i class="fas fa-arrow-circle-up"></i></label><input id="${element[2]}"  type="file" accept=".jpg, .png, .pdf">`

    }
    else{
        return `<img src='${element[0].src}' id="${element[3]}" style='display:none;'><label>${element[1]}</label><label style="background-color:green;" class="up-icon" for="${element[2]}"><i class="fas fa-arrow-circle-up"></i></label><input id="${element[2]}"  type="file" accept=".jpg, .png, .pdf">`
        
    }
    //<label>SATELITE IMAGE</label><label class="up-icon" for="imagem-satelite"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-satelite" type="file" accept=".jpg, .png, .pdf">
}

function excluirCard(card){
    if (card.parentNode) {
        card.parentNode.removeChild(card);
    }
    attContador()
}

function getCardInfo(card){
    var cardInfo = card.children[0]
    
     //--array name   --input inside info              --input empty info                                       --input html name"--label title                    
    var parcelid = [cardInfo.children[0].children[1], `<label>PARCEL ID:</label><input name="parcelid" type="text">`, "parcelid", `PARCEL ID:`]
    var linkgis = [cardInfo.children[2].children[1],`<label>LINK GIS:</label><input name="linkgis" type="text">`, `linkgis`, `LINK GIS:`]
    var floodzonetext = [cardInfo.children[4].children[1], `<label>FLOODZONE:</label><input name="floodzone" type="text">`, `floodzone`, `FLOODZONE:`]
    var mapslink = [cardInfo.children[6].children[1], `<label>MAPS LINK:</label><input name="mapslink" type="text">`, `mapslink`, `MAPS LINK:` ]
    var taxowned = [cardInfo.children[8].children[1],`<label>TAX OWNED:</label><input name="taxowned" type="text">`, `taxowned`, `TAX OWNED:`]
    var marketvalue = [cardInfo.children[9].children[1],`<label>MARKET VALUE:</label><input name="marketvalue" type="text">`, `marketvalue`, `MARKET VALUE:`]
    var latitude = [cardInfo.children[10].children[1],`<label>LATITUDE:</label><input name="latitude" type="text">`, `latitude`, `LATITUDE:`]
    var longitude = [cardInfo.children[11].children[1],`<label>LONGITUDE:</label><input name="longitude" type="text">`, `longitude`, `LONGITUDE:`]
    var acres = [cardInfo.children[12].children[1], `<label>ACRES:</label><input name="acres" type="text">`, `acres`, `ACRES:`]
    var adress = [cardInfo.children[13].children[1],`<label>ADRESS:</label><input name="end" type="text">`, `end`, `ADRESS`]
    var adressn1 = [cardInfo.children[14].children[1],`<label>ADRESS NEIGHBOOR 1:</label><input name="end1" type="text">`, `end1`, `NEIGHBOOR 1 ADRESS:`]
    var adressn2 = [cardInfo.children[15].children[1],`<label>ADRESS NEIGHBOOR 2:</label><input name="end2" type="text">`, `end2`, `NEIGHBOOR 2 ADRESS:`]
    var adressn3 = [cardInfo.children[16].children[1],`<label>ADRESS NEIGHBOOR 3:</label><input name="end3" type="text">`, `end3`, `NEIGHBOOR 3 ADRESS:`]
    var adressn4 = [cardInfo.children[17].children[1],`<label>ADRESS NEIGHBOOR 4:</label><input name="end4" type="text">`, `end4`, `NEIGHBOOR 4 ADRESS:`]
    var rank = [cardInfo.children[18].children[1], `<label>RANK:</label><input name="rank" type="text">`, `rank`]
    var obs = [cardInfo.children[19].children[1], `<label>OBS:</label><input name="obs" type="text">`, `obs`]
     //--array name     --input inside info              --label            --class             --cache id
    var sateliteimage = [cardInfo.children[1].children[1], `SATELITE IMAGE`, 'imagem-satelite', 'cachesateliteimg']
    var floodzoneimage = [cardInfo.children[3].children[1], `FLOODZONE IMAGE`, 'imagem-floodzone', 'cachefloodzoneimg']
    var mapsimage = [cardInfo.children[5].children[1], `MAPS IMAGE`, 'imagem-maps', 'cachemapsimg']
    var streetviewimage = [cardInfo.children[7].children[1], `STREETVIEW IMAGE`, 'imagem-streetview', 'cachestreetviewimg']
}