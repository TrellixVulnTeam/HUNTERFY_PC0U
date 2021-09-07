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

function checkFile(element){
    var cache = element.parentNode.children[0]
    return cache.src
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
    if(element[0].src.length < 100){
        return `<img src='' id="${element[3]}" style='display:none;'><label>${element[1]}</label><label class="up-icon" for="${element[2]}"><i class="fas fa-arrow-circle-up"></i></label><input id="${element[2]}" onchange="preview_image('${element[2]}')"  type="file" accept=".jpg, .png, .pdf">`
    }else{
        return `<img src='${element[0].src}' id="${element[3]}" style='display:none;'><label>${element[1]}</label><label style="background-color:green;" class="up-icon" for="${element[2]}"><i class="fas fa-arrow-circle-up"></i></label><input id="${element[2]}" onchange="preview_image('${element[2]}')" type="file" accept=".jpg, .png, .pdf">`
    }
}


function excluirCard(card){
    if (card.parentNode) {
        card.parentNode.removeChild(card);
    }
    attContador()
}

