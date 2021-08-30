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
                    <div><img src='' id="cachesateliteimg" style='display:none;'><label>SATELITE IMAGE</label><label class="up-icon" for="imagem-satelite"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-satelite" type="file" accept=".jpg, .png, .pdf"></div>
                    <div><label>FLOODZONE IMAGE:</label><label class="up-icon" for="imagem-floodzone"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-floodzone" type="file" accept=".jpg, .png, .pdf"></div>
                    <div><label>MAPS IMAGE:</label><label class="up-icon" for="imagem-maps"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-maps" type="file" accept=".jpg, .png, .pdf"></div>
                    <div><label>STREETVIEW IMAGE:</label><label class="up-icon" for="imagem-streetview"><i class="fas fa-arrow-circle-up"></i></label><input id="imagem-streetview" type="file" accept=".jpg, .png, .pdf"></div>
                    <div><label>TAX OWNED:</label><input name="taxowned" type="text"></div>
                    
                    
                </div>
                <div class="campo2">
                    <div><label>OBS:</label><input name="obs" type="text"></div>
                    <div><label>FLOODZONE:</label><input name="floodzone" type="text"></div>
                    <div><label>MARKET VALUE:</label><input name="marketvalue" type="text"></div>
                    <div><label>LINK GIS:</label><input name="linkgis" type="text"></div>
                    <div><label>LATITUDE:</label><input name="latitude" type="text"></div>
                    <div><label>LONGITUDE:</label><input name="longitude" type="text"></div>
                    
                </div>
                <div class="campo3">
                    <div><label>ADRESS:</label><input name="end" type="text"></div>
                    <div><label>ADRESS V1:</label><input type="text"></div>
                    <div><label>ADRESS V2:</label><input type="text"></div>
                    <div><label>ADRESS V3:</label><input type="text"></div>
                    <div><label>ADRESS V4:</label><input type="text"></div>
                    <div><button class="save-button">SALVAR</button></div>
                </div>
            </form>
        </div>
    `
    pageEdit.innerHTML = editConteudo
    rootEditArea.append(pageEdit)
}

function criarCard(){
    var form = document.querySelector("form")
    var floodzoneImg = document.querySelectorAll("#imagem-floodzone")[0]
    var mapsImg = document.querySelectorAll("#imagem-maps")[0]
    var streetviewImg = document.querySelectorAll("#imagem-streetview")[0]
    var sateliteImg = document.querySelectorAll("#imagem-satelite")[0]
    var novoCard = document.createElement("div")
    
    novoCard.innerHTML = `
        <div class="card">
                <div class="infos">
                    <div class="info-card info-text"><h2>PARCEL ID:</h2> <h2>${checkValue(form.parcelid.value)}</h2></div>
                    <div class="info-card info-img"><h2>SATELITE IMAGE:</h2> <img src="${checkFile(sateliteImg, "cachesateliteimg")}"></img></div>
                    <div class="info-card info-img"><h2>FLOODZONE IMAGE:</h2> <img src="${checkFile(floodzoneImg, "cachefloodzoneimg")}"></img></div>
                    <div class="info-card info-img"><h2>MAPS IMAGE:</h2> <img src="${checkFile(mapsImg, "cachemapsimg")}"></div>
                    <div class="info-card info-img"><h2>STREETVIEW IMAGE</h2> <img src="${checkFile(streetviewImg, "cachestreetviewimg")}"></div>
                    <div class="info-card info-text"><h2>OBS:</h2> <h2>${checkValue(form.obs.value)}</h2></div>
                    <div class="info-card info-text"><h2>FLOODZONE:</h2> <h2>${checkValue(form.floodzone.value)}</h2></div>
                    <div class="info-card info-text"><h2>TAX OWNED:</h2> <h2>${checkValue(form.taxowned.value)}</h2></div>
                    <div class="info-card info-text"><h2>MARKET VALUE</h2> <h2>${checkValue(form.marketvalue.value)}</h2></div>
                    <div class="info-card info-text"><h2>LINK GIS:</h2> <h2>${checkValue(form.linkgis.value)}</h2></div>
                    <div class="info-card info-text"><h2>LATITUDE:</h2> <h2>${checkValue(form.latitude.value)}</h2></div>
                    <div class="info-card info-text"><h2>LONGITUDE:</h2> <h2>${checkValue(form.longitude.value)}</h2></div>
                    <div class="info-card info-text"><h2>ADRESS:</h2> <h2>${checkValue(form.end.value)}</h2></div>
                </div>
                <button class="edit" onclick="editarCard(this.parentElement)"><i class="fas fa-pen-square"></i></button>
                <button class="exclude" onclick="excluirCard(this.parentElement)"><i class="fas fa-trash"></i></i></button>
                
            </div>  
    `
    areaCards.append(novoCard)
}







