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

var botaoLogs = document.querySelector(".logs-button")
botaoLogs.addEventListener("click", ()=>{
    var areaLogs = document.querySelector(".janela-logs")
    if(areaLogs.style.display == "flex"){
        areaLogs.style.display = "none"
    }else{
        areaLogs.style.display = "flex"
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
    if(element[0].src.length < 150){
        return `<img src='' id="${element[3]}" style='display:none;'><label>${element[1]}</label><label class="up-icon" for="${element[2]}"><i class="fas fa-arrow-circle-up"></i></label><input id="${element[2]}" onchange="preview_image('${element[2]}')"  type="file" accept=".jpg, .png, .pdf, .jpeg, .bmp">`
    }else{
        return `<img src='${element[0].src}' id="${element[3]}" style='display:none;'><label>${element[1]}</label><label style="background-color:green;" class="up-icon" for="${element[2]}"><i class="fas fa-arrow-circle-up"></i></label><input id="${element[2]}" onchange="preview_image('${element[2]}')" type="file" accept=".jpg, .png, .pdf, .jpeg, .bmp">`
    }
}

function excluirCard(card){
    if (card.parentNode) {
        card.parentNode.removeChild(card);
    }
    attContador()
}

var botaoLogoff = document.querySelector('#logoff')
botaoLogoff.addEventListener('click', async()=>{
    try{
        const options = {
            method: 'POST',
            body: 'logoff'
        }
        fetch('/logoff', options)
        location.href = '/';
        }
        catch(error){
            console.log(error)
        }
})


function logsCreateUl(){
    var areaLogs = document.querySelector('.area-logs')
    areaLogs.innerHTML = ''
    var logsUl = document.createElement('ul')
    areaLogs.append(logsUl)
}

async function appGetLogs(element){
    var logsContainer = document.querySelector('.area-logs ul')
    var li = document.createElement('li') 
    li.innerHTML = `${element}`
    logsContainer.append(li)
}

var botaoGetLogs = document.querySelector('.get-logs')
botaoGetLogs.addEventListener('click', async()=>{
    try{
        const options = {
            method: 'POST',
            body: 'get-logs'
        }
        const appLogsResponse = await fetch('/appgetlogs', options)
        const appLogsJson = await appLogsResponse.json();
        logsCreateUl()
        for (var i = 0; i < 15; i++) {
            var contentIndex = appLogsJson[i]
            
            appGetLogs(contentIndex.logtype)
            appGetLogs(contentIndex.timestamp)
        }
    }
    catch(error){
        console.log(error)
    }    
})




