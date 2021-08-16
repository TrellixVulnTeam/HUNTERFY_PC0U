function abrirCardEdit(){
    var cardEdit = document.querySelector(".card-edit")
    cardEdit.style.display = "block"
}

function fecharCardEdit(){
    var cardEdit = document.querySelector(".card-edit")
    cardEdit.style.display = "none"
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
