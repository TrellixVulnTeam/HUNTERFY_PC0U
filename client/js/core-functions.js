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