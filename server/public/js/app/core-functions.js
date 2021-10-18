document.getElementById('states').addEventListener('click', async ()=>{
    const states = await fetch('/getUsStates')
    const statesJson = await states.json()
    //console.log(statesJson)
    for (var i = 0; i < statesJson.features.length; i++) {
        var statesIndex = statesJson.features[i]
        var stateName = statesIndex.properties.NAME
        var stateNumber = statesIndex.properties.STATE
        newOption(stateName, stateNumber, 'states')
    }
})

document.getElementById('states').addEventListener('change', async()=>{
    document.getElementById('counties').innerHTML = ''
    var selected = stateQueryValue()
    postState(selected)
})

async function postState(json){
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch('/getUsCounties', options)
        const responseJson = await rawResponse.json();
        //console.log(responseJson)
        for (var i = 0; i < responseJson.data.length; i++) {
            var countyIndex = responseJson.data[i]
            newOption(countyIndex.name, countyIndex.name, 'counties')
        }
    }
    catch(error){
        console.log(error)
    }
}

function stateQueryValue(){
    const stateNum = document.getElementById('states').value
    const stateStr = `
    {
        "stateNumber":"${stateNum}"
    }
    `
    const stateJson = JSON.parse(stateStr)
    return stateJson
}

function newOption(item, itemnumber, inputid){
    const input = document.getElementById(`${inputid}`)
    var opt = document.createElement('option')
    opt.innerHTML = item
    opt.value = itemnumber
    input.append(opt)
}

async function attContador(){
    var contador = document.querySelector(".contador")
    //var contagem = document.querySelectorAll('.card')
    const contagem = await fetch('/getproduction')
    const contagemJson =await contagem.json()
    console.log(contagemJson)
    contador.innerHTML = contagemJson.rowCount
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
    if (element[0].innerHTML.length < 1) {
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

function checkRank(element){
    var rank4check = element.innerHTML
    var rankHTML =  `<div><label>RANK:</label><select name="rank"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="HOUSE">HOUSE(B CASA)</option></select></div>`
    if(rank4check == 'A'){
        rankHTML = `<div><label>RANK:</label><select name="rank"><option value="">--</option><option selected value="A">A</option><option value="B">B</option><option value="C">C</option><option value="HOUSE">HOUSE(B CASA)</option></select></div>`
    }
    if(rank4check == 'B'){
        rankHTML = `<div><label>RANK:</label><select name="rank"><option value="">--</option><option value="A">A</option><option selected value="B">B</option><option value="C">C</option><option value="HOUSE">HOUSE(B CASA)</option></select></div>`
    }
    if(rank4check == 'C'){
        rankHTML = `<div><label>RANK:</label><select name="rank"><option value="">--</option><option value="A">A</option><option value="B">B</option><option selected value="C">C</option><option value="HOUSE">HOUSE(B CASA)</option></select></div>`
    }
    if(rank4check == 'HOUSE'){
        rankHTML = `<div><label>RANK:</label><select name="rank"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option selected value="HOUSE">HOUSE(B CASA)</option></select></div>`
    }
    else{}
    return rankHTML
}

function checkOpt(element){
    const element4check = element[0].innerHTML
    var optHtml = `<div><label>${element[1]}</label><select name="${element[2]}"><option value="">--</option><option value="YES">YES</option><option value="NO">NO</option><option value="undefined">UNDEFINED</option></select></div>`
    if(element4check == 'YES'){
        optHtml = `<div><label>${element[1]}</label><select name="${element[2]}"><option value="">--</option><option selected value="YES">YES</option><option value="NO">NO</option><option value="undefined">UNDEFINED</option></select></div>`
    }
    if(element4check == 'NO'){
        optHtml = `<div><label>${element[1]}</label><select name="${element[2]}"><option value="">--</option><option value="YES">YES</option><option selected value="NO">NO</option><option value="undefined">UNDEFINED</option></select></div>`
    }
    return optHtml
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
    var dt = new Date(element.timestamp)
    
    var day = dt.getDate()
    var mon = dt.getMonth()
    var year = dt.getUTCFullYear()
    var hour = dt.getHours()
    var min = ('0'+dt.getMinutes()).slice(-2);

    li.innerHTML = `*${element.logtype}->${day}/${mon + 1}/${year}, ${hour}:${min}(UTC-3)`
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
            appGetLogs(contentIndex)
        }
    }
    catch(error){
        console.log(error)
    }    
})

function formatString(str){
    var stringEdit = str.replace(/\\/g, '')
    var stringEdit = stringEdit.replace(/</g, '')
    var stringEdit = stringEdit.replace(/'/g, '')
    var stringEdit = stringEdit.replace(/"/g, '')
    var stringEdit = stringEdit.replace(/{/g, '')
    var stringEdit = stringEdit.replace(/}/g, '')
    var stringEdit = stringEdit.replace(/`/g, '')
    var stringEdit = stringEdit.replace(/´/g, '')
    var stringEdit = stringEdit.replace(/!/g, '')
    var stringEdit = stringEdit.replace(/\?/g, '')
    var stringEdit = stringEdit.replace(/;/g, '')
    var stringEdit = stringEdit.replace(/:/g, '')
    var stringEdit = stringEdit.replace(/\|/g, '')
    var stringEdit = stringEdit.replace(/\t/g, '')
    var stringEdit = stringEdit.replace(/\b/g, '')
    var stringEdit = stringEdit.replace(/\f/g, '')
    var stringEdit = stringEdit.replace(/\n/g, '')
    var stringEdit = stringEdit.replace(/\r/g, '')
    var stringEdit = stringEdit.replace(/%/g, '')
    return stringEdit
}

function formatStringPlus(str){
    var string = formatString(str);
    var string = string.replace(/ /g, '')
    return string
}




