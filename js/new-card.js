newCardButton.addEventListener("click", ()=>{
    criarPaginaEdit()

    var botaoSalvar = document.querySelector(".save-button")
    botaoSalvar.addEventListener("click", function(event){
    event.preventDefault()
    criarCard()
    fecharCardEdit()
    attContador()
    })
})

function criarPaginaEdit(){
    var pageEdit = document.createElement('div')
    var editConteudo = 
        `<div class="card-edit">
        <button class="fechar-card" onclick="fecharCardEdit()"><i class="fas fa-times-circle"></i></button>
        <form action="" method="POST">
            <div class="campo1">
                <div><label>PARCEL ID:</label><input name="parcelid" type="text"></div>
                <div><label>IMAGEM SATÉLITE:</label><label class="up-icon" for="imagem-satelite"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-satelite" type="file" accept=".jpg, .png, .pdf"></div>
                <div><label>FLOODZONE IMAGE:</label><label class="up-icon" for="imagem-floodzone"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-floodzone" type="file" accept=".jpg, .png, .pdf"></div>
                <div><label>IMAGEM MAPS:</label><label class="up-icon" for="imagem-maps"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-maps" type="file" accept=".jpg, .png, .pdf"></div>
                <div><label>IMAGEM STREETVIEW:</label><label class="up-icon" for="imagem-streetview"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-streetview" type="file" accept=".jpg, .png, .pdf"></div>
                <div><label>TAX OWNED:</label><label class="up-icon" for="imagem-tax"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-tax" name="imagem-tax" type="file" accept=".jpg, .png, .pdf"></div>
                
                
            </div>
            <div class="campo2">
                <div><label>OBSERVAÇÃO:</label><input name="obs" type="text"></div>
                <div><label>FLOODZONE:</label><input name="floodzone" type="text"></div>
                <div><label>MARKET VALUE:</label><input name="marketvalue" type="text"></div>
                <div><label>LINK GIS:</label><input name="linkgis" type="text"></div>
                <div><label>LATITUDE:</label><input name="latitude" type="text"></div>
                <div><label>LONGITUDE:</label><input name="longitude" type="text"></div>
                
            </div>
            <div class="campo3">
                <div><label>ENDEREÇO:</label><input name="end" type="text"></div>
                <div><label>ENDEREÇO V1:</label><input type="text"></div>
                <div><label>ENDEREÇO V2:</label><input type="text"></div>
                <div><label>ENDEREÇO V3:</label><input type="text"></div>
                <div><label>ENDEREÇO V4:</label><input type="text"></div>
                <div><button class="save-button">SALVAR</button></div>
            </div>
        </form>
    </div>
    `
    pageEdit.innerHTML = editConteudo
    rootEditArea.append(pageEdit)
}

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
        var elementName = "tr.png"
        alert(`falta selecionar arquivo: ${elementid}`)
    }else{
        var elementName = element.files[0].name
        }
    return elementName
}

function criarCard(){
    var form = document.querySelector("form")
    var floodzoneImg = document.querySelectorAll("#imagem-floodzone")[0]
    var mapsImg = document.querySelectorAll("#imagem-maps")[0]
    var streetviewImg = document.querySelectorAll("#imagem-streetview")[0]
    var sateliteImg = document.querySelectorAll("#imagem-satelite")[0]
    var taxImg = document.querySelectorAll("#imagem-tax")[0]

    var novoCard = document.createElement("div")
    
    novoCard.innerHTML = `
        <div class="card">
                <div class="infos">
                    <div class="info-card info-text"><h2>PARCEL ID:</h2> <h2>${checkValue(form.parcelid.value)}</h2></div>
                    <div class="info-card info-img"><h2>SATELITE IMAGE:</h2> <img src="./imgdatabase/${checkFile(sateliteImg, ", satelite image.")}"></img></div>
                    <div class="info-card info-img"><h2>FLOODZONE IMAGE:</h2> <img src="./imgdatabase/${checkFile(floodzoneImg, ", floodzone image.")}"></img></div>
                    <div class="info-card info-img"><h2>MAPS IMAGE:</h2> <img src="./imgdatabase/${checkFile(mapsImg, "maps image.")}"></div>
                    <div class="info-card info-img"><h2>IMAGEM STREETVIEW:</h2> <img src="./imgdatabase/${checkFile(streetviewImg, ", streetview image.")}"></div>
                    <div class="info-card info-text"><h2>OBSERVAÇÃO:</h2> <h2>${checkValue(form.obs.value)}</h2></div>
                    <div class="info-card info-text"><h2>FLOOD ZONE:</h2> <h2>${checkValue(form.floodzone.value)}</h2></div>
                    <div class="info-card info-img"><h2>TAX OWNED:</h2> <img src="./imgdatabase/${checkFile(taxImg, "taxxxxxx image.")}"></div>
                    <div class="info-card info-text"><h2>MARKET VALUE</h2> <h2>${checkValue(form.marketvalue.value)}</h2></div>
                    <div class="info-card info-text"><h2>LINK GIS:</h2> <h2>${checkValue(form.linkgis.value)}</h2></div>
                    <div class="info-card info-text"><h2>LATITUDE:</h2> <h2>${checkValue(form.latitude.value)}</h2></div>
                    <div class="info-card info-text"><h2>LONGITUDE:</h2> <h2>${checkValue(form.longitude.value)}</h2></div>
                    <div class="info-card info-text"><h2>ENDEREÇO:</h2> <h2>${checkValue(form.end.value)}</h2></div>
                </div>
                <button class="edit" onclick="abrirCardEdit()"><i class="fas fa-pen-square"></i></button>
            </div>
    `
    areaCards.append(novoCard)
    
}

function criarPaginaEditPos(){
    var pageEdit = document.createElement('div')
    var editConteudo = 
        `<div class="card-edit">
            <button class="fechar-card" onclick="fecharCardEdit()"><i class="fas fa-times-circle"></i></button>
            <form action="" method="POST">
                <div class="campo1">
                    <div><label>PARCEL ID:</label><input name="parcelid" type="text"></div>
                    <div><label>IMAGEM SATÉLITE:</label><label class="up-icon" for="imagem-satelite"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-satelite" type="file" accept=".jpg, .png, .pdf"></div>
                    <div><label>FLOODZONE IMAGE:</label><label class="up-icon" for="imagem-floodzone"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-floodzone" type="file" accept=".jpg, .png, .pdf"></div>
                    <div><label>IMAGEM MAPS:</label><label class="up-icon" for="imagem-maps"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-maps" type="file" accept=".jpg, .png, .pdf"></div>
                    <div><label>IMAGEM STREETVIEW:</label><label class="up-icon" for="imagem-streetview"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-streetview" type="file" accept=".jpg, .png, .pdf"></div>
                    <div><label>TAX OWNED:</label><label class="up-icon" for="imagem-tax"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-tax" name="imagem-tax" type="file" accept=".jpg, .png, .pdf"></div>
                    
                    
                </div>
                <div class="campo2">
                    <div><label>OBSERVAÇÃO:</label><input name="obs" type="text"></div>
                    <div><label>FLOODZONE:</label><input name="floodzone" type="text"></div>
                    <div><label>MARKET VALUE:</label><input name="marketvalue" type="text"></div>
                    <div><label>LINK GIS:</label><input name="linkgis" type="text"></div>
                    <div><label>LATITUDE:</label><input name="latitude" type="text"></div>
                    <div><label>LONGITUDE:</label><input name="longitude" type="text"></div>
                    
                </div>
                <div class="campo3">
                    <div><label>ENDEREÇO:</label><input name="end" type="text"></div>
                    <div><label>ENDEREÇO V1:</label><input type="text"></div>
                    <div><label>ENDEREÇO V2:</label><input type="text"></div>
                    <div><label>ENDEREÇO V3:</label><input type="text"></div>
                    <div><label>ENDEREÇO V4:</label><input type="text"></div>
                    <div><button class="save-button">SALVAR</button></div>
                </div>
            </form>
        </div>
    `
    pageEdit.innerHTML = editConteudo
    rootEditArea.append(pageEdit)
}

function handleFiles() {
    var fileList = this.files;
    console.log(fileList)
  }

