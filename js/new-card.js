var newCardButton = document.querySelector(".add-card")
var areaCards = document.querySelector(".area-cards")

newCardButton.addEventListener("click", ()=>{
    var newCard = document.createElement('div')
    newCard.classList.add('card')
    var cardConteudo =  `
                <div class="infos">
                    <div class="info-card info-text"><h2>Parcel ID:</h2><h2>23232323</h2></div>
                    <div class="info-card info-img"><h2>IMAGEM SATELITE:</h2><h2></h2></div>
                    <div class="info-card info-img"><h2>IMAGEM FLOOD ZONE:</h2><h2></h2></div>
                    <div class="info-card info-img"><h2>IMAGEM MAPS:</h2><h2></h2></div>
                    <div class="info-card info-img"><h2>IMAGEM STREETVIEW:</h2><h2></h2></div>
                    <div class="info-card info-text"><h2>OBSERVAÇÃO:</h2><h2>23232323</h2></div>
                    <div class="info-card info-text"><h2>FLOOD ZONE:</h2><h2>23232323</h2></div>
                    <div class="info-card info-img"><h2>TAX OWNED:</h2><h2></h2></div>
                    <div class="info-card info-text"><h2>MARKET VALUE</h2><h2>23232323</h2></div>
                    <div class="info-card info-text"><h2>LINK GIS:</h2><h2>23232323</h2></div>
                    <div class="info-card info-text"><h2>ENDEREÇO:</h2><h2>23232323</h2></div>
                </div>
                <button class="edit"><i class="fas fa-pen-square"></i></button>
    `

    newCard.innerHTML = cardConteudo
    areaCards.append(newCard)
})
    

