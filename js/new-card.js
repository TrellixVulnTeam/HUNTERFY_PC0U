var newCardButton = document.querySelector(".add-card")
var areaCards = document.querySelector(".area-cards")


newCardButton.addEventListener("click", ()=>{
    var newCard = document.createElement('div')
    var cardConteudo =  `
        <div class="card">
            <div class="infos">
                <div class="info-card info-text"><h2>PARCEL ID:</h2> <h2></h2></div>
                <div class="info-card info-img"><h2>IMAGEM SATELITE:</h2> <h2></h2></div>
                <div class="info-card info-img"><h2>IMAGEM FLOOD ZONE:</h2> <h2></h2></div>
                <div class="info-card info-img"><h2>IMAGEM MAPS:</h2> <h2></h2></div>
                <div class="info-card info-img"><h2>IMAGEM STREETVIEW:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>OBSERVAÇÃO:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>FLOOD ZONE:</h2> <h2></h2></div>
                <div class="info-card info-img"><h2>TAX OWNED:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>MARKET VALUE</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>LINK GIS:</h2> <h2></h2></div>
                <div class="info-card info-text"><h2>ENDEREÇO:</h2> <h2></h2></div>
            </div>
            <button class="edit" onclick="abrirCardEdit()"><i class="fas fa-pen-square"></i></button>
        </div>
        <div class="card-edit">
            <button class="fechar-card" onclick="fecharCardEdit()"><i class="fas fa-times-circle"></i></button>
            <form action="" method="POST">
                <div class="campo1">
                    <div><label>PARCEL ID:</label><input type="text"></div>
                    <div><label>IMAGEM SATÉLITE:</label><input type="file" accept=".jpg, .png, .pdf"></div>
                    <div><label>IMAGEM FLOODZONE:</label><input type="file" accept=".jpg, .png, .pdf"></div>
                    <div><label>IMAGEM MAPS:</label><input type="file" accept=".jpg, .png, .pdf"></div>
                    <div><label>IMAGEM STREETVIEW:</label><input type="file" accept=".jpg, .png, .pdf"></div>
                    <div><label>OBSERVAÇÃO:</label><input type="text"></div>
                    
                </div>
                <div class="campo2">
                    <div><label>FLOODZONE:</label><input type="text"></div>
                    <div><label>TAX OWNED:</label><input type="file" accept=".jpg, .png, .pdf"></div>
                    <div><label>MARKET VALUE:</label><input type="text"></div>
                    <div><label>LINK GIS:</label><input type="text"></div>
                    <div><label>ENDEREÇO:</label><input type="text"></div>
                    
                </div>
                <div class="campo3">
                    <div><label>ENDEREÇO V1:</label><input type="text"></div>
                    <div><label>ENDEREÇO V2:</label><input type="text"></div>
                    <div><label>ENDEREÇO V3:</label><input type="text"></div>
                    <div><label>ENDEREÇO V4:</label><input type="text"></div>
                    <div><button>SALVAR</button></div>
                </div>
            </form>
        </div>
    `
    newCard.innerHTML = cardConteudo
    areaCards.append(newCard)

    var contador = document.querySelector(".contador")
    var contagem = document.querySelectorAll('.card')
    for (var i = 0; i < contagem.length; i++){
        contador.innerHTML = contagem.length
    }
})
    

