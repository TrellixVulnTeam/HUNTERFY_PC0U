var newCardButton = document.querySelector(".add-card")
var areaCards = document.querySelector(".area-cards")

newCardButton.addEventListener("click", ()=>{
    var newCard = document.createElement('div')
    newCard.classList.add('card')
    var cardConteudo =  `
    <button class="edit"><i class="fas fa-pen-square"></i></button>
    `

    newCard.innerHTML = cardConteudo
    areaCards.append(newCard)
})
    

